import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const EXAMPLE_PHRASES = JSON.stringify([
  { id: '1', phrase: 'username', category: 'Pulse', trivalence: 'UN', description: 'User login name input' },
  { id: '2', phrase: 'password', category: 'Pulse', trivalence: 'UN', description: 'User password input' },
  { id: '3', phrase: 'login_valid', category: 'DN', trivalence: 'N', description: 'Validates credentials' },
  { id: '4', phrase: 'auth_token', category: 'O', trivalence: 'N', description: 'Authentication token output' },
  { id: '5', phrase: 'submit_login', category: 'Pulse', trivalence: 'UN', description: 'Login form submission trigger' },
  { id: '6', phrase: 'user_profile', category: 'I', trivalence: 'Y', description: 'User profile data channel' },
  { id: '7', phrase: 'error_message', category: 'O', trivalence: 'N', description: 'Error feedback output' },
  { id: '8', phrase: 'session_active', category: 'DN', trivalence: 'N', description: 'Session state check' },
]);

const EXAMPLE_CPUX = JSON.stringify({
  containers: [
    {
      id: 'ic1',
      name: 'Login Input Collection',
      oHolder: ['username', 'password'],
      dn: null,
      dnDescription: 'Trigger container - collects user input',
      oReflector: ['submit_login'],
      triggerSignal: 'submit_login',
      releaseSignal: 'credentials_signal',
    },
    {
      id: 'ic2',
      name: 'Credential Validation',
      oHolder: ['submit_login', 'username', 'password'],
      dn: 'login_valid',
      dnDescription: 'Validates username/password against stored credentials',
      oReflector: ['auth_token', 'error_message'],
      triggerSignal: 'credentials_signal',
      releaseSignal: 'auth_result_signal',
    },
    {
      id: 'ic3',
      name: 'Session Establishment',
      oHolder: ['auth_token'],
      dn: 'session_active',
      dnDescription: 'Establishes active session from auth token',
      oReflector: ['user_profile'],
      triggerSignal: 'auth_result_signal',
      releaseSignal: 'session_signal',
    },
  ],
  releaseSignals: ['session_signal', 'auth_result_signal'],
  triggerSignal: 'submit_login',
});

async function main() {
  const passwordHash = await bcrypt.hash('johndoe123', 12);
  const user = await prisma.user.upsert({
    where: { email: 'john@doe.com' },
    update: {},
    create: {
      email: 'john@doe.com',
      name: 'John Doe',
      passwordHash,
    },
  });

  await prisma.project.upsert({
    where: { id: 'example-login-project' },
    update: {},
    create: {
      id: 'example-login-project',
      userId: user.id,
      name: 'Login Flow Example',
      scenario: 'A user opens the application and sees a login form. They enter their username and password, click submit, the system validates their credentials against stored records. If valid, a session token is created and the user sees their profile dashboard. If invalid, an error message is displayed and the user can retry.',
      phrases: EXAMPLE_PHRASES,
      cpuxDesign: EXAMPLE_CPUX,
      verification: JSON.stringify({
        results: [
          { rule: 'DN Statelessness', passed: true, message: 'All DNs are stateless blackboxes' },
          { rule: 'O_holder accumulation', passed: true, message: 'O_holders only accumulate, no transforms' },
          { rule: 'O_reflector reflect-only', passed: true, message: 'O_reflectors only reflect DN output' },
          { rule: 'UI as mirror', passed: true, message: 'UI components are Objects, no computation' },
          { rule: 'Unique trigger signals', passed: true, message: 'Each CPUX trigger is unique in Intention Space' },
        ],
      }),
      exportData: JSON.stringify({ exported: false }),
    },
  });

  console.log('Seed complete');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
