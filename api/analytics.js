// Vercel serverless function to capture analytics events
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
    const event = req.body;

    // Validate event structure
    if (!event.event_name || !event.session_id) {
      return res.status(400).json({ 
        error: 'Missing required fields: event_name and session_id' 
      });
    }

    console.log('Analytics Event Received:', {
      event_name: event.event_name,
      session_id: event.session_id,
      timestamp: event.timestamp
    });

    // Here you would typically:
    // 1. Store in your analytics database (Supabase, PostHog, etc.)
    // 2. Forward to data warehouse
    // 3. Trigger real-time alerts/automations

    // Example: Store in Supabase (uncomment when ready)
    /*
    const { createClient } = require('@supabase/supabase-js');
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_ANON_KEY
    );

    const { data, error } = await supabase
      .from('analytics_events')
      .insert([{
        event_name: event.event_name,
        session_id: event.session_id,
        lead_id: event.lead_id,
        properties: event,
        created_at: new Date().toISOString()
      }]);

    if (error) {
      console.error('Supabase error:', error);
      return res.status(500).json({ error: 'Failed to store event' });
    }
    */

    // For now, just log and return success
    res.status(200).json({ 
      success: true, 
      event_id: `evt_${Date.now()}`,
      message: 'Event captured successfully' 
    });

  } catch (error) {
    console.error('Analytics API error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}