import fs from 'fs';

async function test() {
  try {
    const res = await fetch('https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=800&q=80');
    console.log('Unsplash fetch status:', res.status);
    const arrayBuffer = await res.arrayBuffer();
    console.log('Downloaded bytes:', arrayBuffer.byteLength);
  } catch (err) {
    console.error('Fetch error:', err.message);
  }
}
test();
