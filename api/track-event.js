// Vercel serverless function to track analytics events
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
    const eventData = req.body;

    console.log('Analytics event received:', {
      name: eventData.name,
      category: eventData.category,
      session_id: eventData.session_id,
      timestamp: eventData.timestamp
    });

    // Validate required fields
    if (!eventData.name || !eventData.category || !eventData.session_id) {
      return res.status(400).json({ 
        error: 'Missing required fields: name, category, session_id' 
      });
    }

    // Here you would typically store the event in your database
    // For now, we'll just log it and return success
    
    // Example: Store in Supabase, Firebase, or your preferred database
    /*
    const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);
    const { error } = await supabase
      .from('events')
      .insert([{
        name: eventData.name,
        category: eventData.category,
        label: eventData.label,
        value: eventData.value,
        session_id: eventData.session_id,
        lead_id: eventData.lead_id,
        utm_source: eventData.utm_source,
        utm_medium: eventData.utm_medium,
        utm_campaign: eventData.utm_campaign,
        utm_content: eventData.utm_content,
        gclid: eventData.gclid,
        fbclid: eventData.fbclid,
        device: eventData.device,
        country: eventData.country,
        custom_parameters: eventData.custom_parameters,
        created_at: eventData.timestamp
      }]);

    if (error) {
      console.error('Database error:', error);
      return res.status(500).json({ error: 'Failed to store event' });
    }
    */

    // Send event to external analytics services if needed
    // Example: Send to Mixpanel, Amplitude, or other analytics platforms
    
    res.status(200).json({ 
      success: true,
      message: 'Event tracked successfully',
      event_id: `evt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    });

  } catch (error) {
    console.error('Analytics tracking error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}