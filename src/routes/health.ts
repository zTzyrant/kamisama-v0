// Health gate untuk blue-green deploy (D5).
// kamisama-deploy.sh curl http://127.0.0.1:<port>/health sampai 200 (~30 dtk).
// Gagal = artefak baru di-destroy, yang lama utuh.
export function GET() {
  return new Response(JSON.stringify({ status: 'ok' }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
