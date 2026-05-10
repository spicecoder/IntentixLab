export interface ExampleScenario {
  id: string;
  name: string;
  description: string;
  scenario: string;
}

export const EXAMPLE_SCENARIOS: ExampleScenario[] = [
  {
    id: 'login',
    name: 'User Login Flow',
    description: 'Standard authentication with username, password validation, and session creation.',
    scenario: `A user opens the application and sees a login form. They enter their username and password, click submit, the system validates their credentials against stored records. If valid, a session token is created and the user sees their profile dashboard. If invalid, an error message is displayed and the user can retry.`,
  },
  {
    id: 'shopping-cart',
    name: 'Shopping Cart Checkout',
    description: 'E-commerce cart with item management, payment processing, and order confirmation.',
    scenario: `A shopper browses products and adds items to their cart. They can view the cart, update quantities, or remove items. When ready, they proceed to checkout. The system calculates the total including tax and shipping. The shopper enters payment information which is validated. On successful payment, an order confirmation is generated with a unique order ID and sent to the shopper. The cart is then cleared.`,
  },
  {
    id: 'ticket-support',
    name: 'Support Ticket System',
    description: 'Issue tracking with ticket creation, assignment, status updates, and resolution.',
    scenario: `A customer submits a support request by filling out a form with their issue description and priority level. The system assigns a ticket ID and routes it to the appropriate support team based on category. A support agent picks up the ticket, updates its status, adds internal notes, and communicates with the customer. The ticket moves through states: Open, In Progress, Waiting on Customer, Resolved, Closed. Both customer and agent can view the ticket history.`,
  },
];

export const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  Pulse: 'User-triggered perception — the smallest unit of meaningful data with trivalence (Y/N/UN). Represents inputs, actions, or observations.',
  DN: 'Design Node — a blackbox computational unit that absorbs signals and emits signals. Stateless processing logic.',
  I: 'Intention — a named channel of communication between components. Carries semantic identity.',
  O: 'Object — a reflector that carries signals without modifying them. Includes O_holder (accumulator) and O_reflector (emitter).',
};

export const VERIFICATION_RULES = [
  {
    id: 'dn-stateless',
    name: 'DN Statelessness',
    description: 'Design Nodes must be stateless blackboxes — they absorb signals and emit signals without retaining state between activations.',
  },
  {
    id: 'oholder-accumulate',
    name: 'O_holder Accumulation Only',
    description: 'O_holder objects must only accumulate perceptions. They cannot compute, transform, or derive new values.',
  },
  {
    id: 'oreflector-reflect',
    name: 'O_reflector Reflect-Only',
    description: 'O_reflector objects must only reflect DN output outward. They cannot modify pulse response fields.',
  },
  {
    id: 'ui-mirror',
    name: 'UI as Mirror (Object Contract)',
    description: 'UI components are Objects in Intention Space — they reflect signals without computation. No hidden validation or auto-correction.',
  },
  {
    id: 'unique-triggers',
    name: 'Unique Trigger Signals',
    description: 'Each CPUX must have a unique trigger signal within the Intention Space. One trigger maps to exactly one CPUX.',
  },
  {
    id: 'ic-structure',
    name: 'IC Structural Integrity',
    description: 'Each Intention Container must have the quintuple: O_holder - DN - S1 - O_reflector - S2.',
  },
  {
    id: 'signal-identity',
    name: 'Signal Semantic Identity',
    description: 'Every Signal must pair an Intention with a set of Pulses — identified communication, not ephemeral.',
  },
  {
    id: 'cpux-sequence',
    name: 'CPUX Sequence Validity',
    description: 'First IC has null DN (trigger pattern S-O-S). Last IC releases signal to Field (O-S pattern).',
  },
];
