import { NestFactory } from '@nestjs/core';
import * as bcrypt from 'bcrypt';
import { AppModule } from '../app.module';
import { UsersService } from '../users/users.service';

async function seed() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const usersService = app.get(UsersService);

  const email = process.env.SEED_ADMIN_EMAIL ?? 'admin@example.com';
  const password = process.env.SEED_ADMIN_PASSWORD ?? 'Admin123!';

  const existing = await usersService.findByEmail(email);
  if (existing) {
    console.log(`Admin user already exists: ${email}`);
    await app.close();
    return;
  }

  const passwordHash = await bcrypt.hash(password, 10);
  await usersService.create({ email, name: 'Admin', passwordHash });

  console.log(`Seeded admin user: ${email} / ${password}`);
  await app.close();
}

seed().catch((error) => {
  console.error('Seed failed:', error);
  process.exit(1);
});
