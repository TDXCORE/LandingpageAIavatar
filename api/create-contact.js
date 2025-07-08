// Vercel serverless function to create Chatwoot contact
export default async function handler(req, res) {
  // Add CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Handle preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, phone } = req.body;

    // Validate required fields
    if (!name || !email || !phone) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Format phone number to E.164 format
    const formatPhoneNumber = (phone) => {
      // If phone is already in E.164 format (starts with +), return as is
      if (phone && phone.startsWith('+')) {
        return phone;
      }
      
      // Clean phone number of non-digit characters
      const digits = phone.replace(/\D/g, '');
      
      // If it's a Colombian number without country code
      if (digits.length === 10 && !digits.startsWith('57')) {
        return `+57${digits}`;
      }
      
      // If it starts with 57 and has the right length for Colombia
      if (digits.startsWith('57') && digits.length >= 10) {
        return `+${digits}`;
      }
      
      // For other cases, try to format as E.164
      if (digits.length > 0) {
        return `+${digits}`;
      }
      
      // Fallback to Colombia format
      return `+57${digits}`;
    };

    const formattedPhone = formatPhoneNumber(phone);

    // Chatwoot API call
    const chatwootResponse = await fetch(
      `https://app.chatwoot.com/api/v1/accounts/${process.env.CHATWOOT_ACCOUNT_ID}/contacts`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api_access_token': process.env.CHATWOOT_API_TOKEN,
        },
        body: JSON.stringify({
          name,
          email,
          phone_number: formattedPhone,
          identifier: `lead-${Date.now()}`,
          custom_attributes: {
            source: 'landing_page',
            form_type: 'vsl_lead_form',
            created_at: new Date().toISOString(),
          },
        }),
      }
    );

    if (!chatwootResponse.ok) {
      const errorData = await chatwootResponse.json();
      console.error('Chatwoot API Error:', errorData);
      return res.status(chatwootResponse.status).json({ 
        error: errorData.message || 'Failed to create contact' 
      });
    }

    const contact = await chatwootResponse.json();
    
    // Optional: Create conversation if inbox_id is provided
    if (process.env.CHATWOOT_INBOX_ID) {
      try {
        await fetch(
          `https://app.chatwoot.com/api/v1/accounts/${process.env.CHATWOOT_ACCOUNT_ID}/conversations`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'api_access_token': process.env.CHATWOOT_API_TOKEN,
            },
            body: JSON.stringify({
              source_id: formattedPhone,
              inbox_id: parseInt(process.env.CHATWOOT_INBOX_ID),
              contact_id: contact.id,
            }),
          }
        );
      } catch (conversationError) {
        console.warn('Failed to create conversation:', conversationError);
      }
    }

    res.status(200).json({ 
      success: true, 
      contactId: contact.id,
      message: 'Contact created successfully'
    });

  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}