export async function perform(signal) {
  const latest = (phrase, fallback = '') => {
    const pulse = signal.pulses.find((p) => p.phrase === phrase);
    if (!pulse || !pulse.responses?.length) return fallback;
    const value = pulse.responses[pulse.responses.length - 1];
    return Array.isArray(value) ? value[value.length - 1] : value;
  };

  const username = latest('username');
  const password = latest('password');
  const ok = username === 'pronab' && password === 'intentix';

  return {
    signalId: 'S_user_authenticated',
    intentionId: 'I_user_authenticated',
    pulses: [
      { phrase: 'authenticated', tv: 'N', responses: [String(ok)] },
      { phrase: 'user_id', tv: 'N', responses: [ok ? 'user_pronab' : ''] },
      { phrase: 'user_message', tv: 'N', responses: [ok ? 'Authenticated user pronab.' : 'Authentication failed.'] }
    ]
  };
}
