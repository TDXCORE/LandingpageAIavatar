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
    const { 
      name, 
      email, 
      phone,
      // New AI Avatar fields
      company,
      role,
      industry,
      revenue_band,
      use_case_primary,
      urgency,
      // Analytics fields
      utm_source,
      utm_medium,
      utm_campaign,
      utm_content,
      session_id,
      video_progress,
      gclid,
      fbclid
    } = req.body;

    console.log('Received request data:', { name, email, phone });

    // Validate required fields
    if (!name || !email || !phone) {
      console.error('Missing required fields:', { name: !!name, email: !!email, phone: !!phone });
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

    console.log('Formatted phone:', formattedPhone);
    console.log('Chatwoot account ID:', process.env.VITE_CHATWOOT_ACCOUNT_ID || process.env.CHATWOOT_ACCOUNT_ID);
    console.log('Chatwoot API token exists:', !!(process.env.VITE_CHATWOOT_API_TOKEN || process.env.CHATWOOT_API_TOKEN));

    // Chatwoot API call with enhanced data
    const chatwootPayload = {
      name,
      email,
      phone_number: formattedPhone,
      identifier: `ai-avatar-${Date.now()}`,
      custom_attributes: {
        source: 'ai_avatar_landing',
        form_type: 'ai_avatar_lead_form',
        created_at: new Date().toISOString(),
        // Business fields
        company: company || '',
        role: role || '',
        industry: industry || '',
        revenue_band: revenue_band || '',
        use_case_primary: use_case_primary || '',
        urgency: urgency || '',
        // Analytics fields
        utm_source: utm_source || '',
        utm_medium: utm_medium || '',
        utm_campaign: utm_campaign || '',
        utm_content: utm_content || '',
        session_id: session_id || '',
        video_progress: video_progress || 0,
        gclid: gclid || '',
        fbclid: fbclid || '',
        lead_score: calculateLeadScore({
          company,
          role,
          industry,
          revenue_band,
          urgency,
          video_progress
        })
      },
    };

    // Calculate lead score function
    function calculateLeadScore(data) {
      let score = 0;
      
      // Company presence (+10)
      if (data.company) score += 10;
      
      // Senior role (+20)
      if (data.role && ['cto', 'cio', 'director', 'head', 'vp', 'ceo'].some(r => 
        data.role.toLowerCase().includes(r))) score += 20;
      
      // High-value industry (+15)
      if (data.industry && ['technology', 'finance', 'healthcare', 'enterprise'].some(i => 
        data.industry.toLowerCase().includes(i))) score += 15;
      
      // Revenue band (+25 for enterprise)
      if (data.revenue_band && data.revenue_band.includes('10M+')) score += 25;
      else if (data.revenue_band && data.revenue_band.includes('1M+')) score += 15;
      
      // Urgency (+20 for immediate)
      if (data.urgency === 'immediate') score += 20;
      else if (data.urgency === '1-3_months') score += 10;
      
      // Video engagement (+10 for >50% viewed)
      if (data.video_progress > 50) score += 10;
      
      return Math.min(score, 100); // Cap at 100
    }

    console.log('Chatwoot payload:', chatwootPayload);

    const accountId = process.env.VITE_CHATWOOT_ACCOUNT_ID || process.env.CHATWOOT_ACCOUNT_ID;
    const apiToken = process.env.VITE_CHATWOOT_API_TOKEN || process.env.CHATWOOT_API_TOKEN;

    const chatwootResponse = await fetch(
      `https://app.chatwoot.com/api/v1/accounts/${accountId}/contacts`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api_access_token': apiToken,
        },
        body: JSON.stringify(chatwootPayload),
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
    const inboxId = process.env.VITE_CHATWOOT_INBOX_ID || process.env.CHATWOOT_INBOX_ID;
    if (inboxId) {
      try {
        await fetch(
          `https://app.chatwoot.com/api/v1/accounts/${accountId}/conversations`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'api_access_token': apiToken,
            },
            body: JSON.stringify({
              source_id: formattedPhone,
              inbox_id: parseInt(inboxId),
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