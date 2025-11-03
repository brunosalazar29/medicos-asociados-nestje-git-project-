const sql = require('mssql');

const config = {
  server: 'ELPAPUDEPAPUS', // o localhost si prefieres
  database: 'BD_Sanna_ambulatoria',
  user: 'sa',
  password: 'P@ssw0rd123',
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

async function run() {
  try {
    const pool = await sql.connect(config);
    const result = await pool.request().query('SELECT DB_NAME() as base, GETDATE() as fecha');
    console.log('✅ Conexión OK:', result.recordset);
    await sql.close();
  } catch (err) {
    console.error('❌ ERROR NODE mssql =>', err);
  }
}

run();
