// Minimal express server used as a helper API for n8n workflows.
// WARNING: For production, add proper error handling, logging and security.
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const app = express();
app.use(bodyParser.json());

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Health check
app.get('/health', (req, res) => res.json({ status: 'ok' }));

// Create transaction (used by n8n as alternative to direct DB insert)
app.post('/transactions', async (req, res) => {
  try {
    const { user_id, amount, category, description, date, raw_text, meta } = req.body;
    const { data, error } = await supabase.from('transactions').insert([{
      user_id, amount, category, description, date, raw_text, meta
    }]);
    if (error) return res.status(400).json({ error });
    return res.json({ ok: true, data });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'internal_error' });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('Server listening on', port));
