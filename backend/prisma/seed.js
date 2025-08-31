const { PrismaClient } = require('@prisma/client');
const { hashPassword } = require('./src/utils/password');
const prisma = new PrismaClient();

async function main() {
  const adminPass = await hashPassword('adminpassword');
  const agentPass = await hashPassword('agentpassword');

  await prisma.user.createMany({
    data: [
      { username: 'admin', email: 'admin@ansd.sn', password: adminPass, role: 'admin' },
      { username: 'agent', email: 'agent@ansd.sn', password: agentPass, role: 'agent' }
    ]
  });
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
