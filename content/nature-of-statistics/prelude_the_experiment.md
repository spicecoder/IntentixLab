## Prelude: The Experiment
### *A Single MNIST Network, Thirty-One Ways of Seeing*

> *"Before we ask what the network learned, we must ask what the network was allowed to see."*

---

### I. The Notebook That Started It All

On a quiet afternoon in 2020, a high school student named Samson Zhang uploaded a notebook to Kaggle. The title was modest: *"Simple MNIST NN from scratch (numpy, no TF/Keras)."* It was 62 seconds of runtime, a few hundred lines of Python, and zero dependencies beyond NumPy. It trained a two-layer neural network to recognize handwritten digits. It achieved roughly 90% accuracy. It was, by every conventional measure, unremarkable.

And yet, that notebook has been viewed over a quarter of a million times. It has become a rite of passage. It is the place where countless practitioners first watched a machine learn.

We will use Samson's notebook as our ground. Not because it is the best network — it is not. Not because it is the most accurate — it is far from it. We use it because it is **transparent**. Every operation is visible. There are no black-box frameworks hiding the mechanics. There is only NumPy, linear algebra, and the raw logic of learning.

This transparency is essential for what follows. Because we are not going to ask: *"How accurate is this network?"* We are going to ask something stranger: *"What does each mathematical operation believe it is doing?"*

---

### II. The Architecture as a Parliament

Samson's network is architecturally simple. It has:

- **An input layer**: 784 neurons, one for each pixel of a 28×28 grayscale image
- **A hidden layer**: 10 neurons (in the original), fully connected, with ReLU activation
- **An output layer**: 10 neurons, one for each digit class, producing raw scores
- **A loss function**: Sum of squared error between predictions and one-hot labels
- **An optimizer**: Stochastic gradient descent, updating weights by hand-computed gradients
- **A regularizer**: Dropout, randomly silencing neurons during training
- **A metric**: Accuracy, counting how many digits were guessed correctly

This is not just a network. It is a **Parliament in miniature**. Each component — each layer, each function, each update rule — is a Domain Neuron with an identity, an intention, and a blind spot.

Consider the journey of a single MNIST image through this network:

1. **Xavier** (or random initialization) births the weights into existence, setting their initial variance so the signal neither vanishes nor explodes.
2. **The hidden layer** receives 784 pixel values, multiplies them by weights, adds biases — a linear transformation that projects the image into a 10-dimensional space.
3. **ReLU** inspects those 10 values and silences the negative ones, introducing non-linearity and sparsity.
4. **Dropout** (during training) randomly covers some of those activations, forcing the network to learn robust, distributed representations.
5. **The output layer** takes the surviving activations, multiplies by a second weight matrix, and produces 10 raw scores.
6. **Softmax** converts those scores into a probability distribution — a competition where the highest score claims the largest share, but no score is ever truly zero.
7. **MSE** (or CrossEntropy, in variants) measures the distance between the predicted distribution and the true label, producing a single number: the loss.
8. **SGD** (or Momentum, or Adam, in more sophisticated versions) computes the gradient of that loss with respect to every weight, then nudges each weight in the direction that reduces the loss.
9. **Accuracy** counts how many times the network's highest-probability guess matches the true label.

Each of these steps is a **voice**. Each has something to say about the digit passing through. And each, as we will discover, sees something the others miss.

---

### III. The Frame, Revisited

Before we enter the Parliament, we must acknowledge the frame one more time. The MNIST dataset is not "digits." It is digits-as-extracted-from-American-Census-forms-and-high-school-papers, normalized to 20×20, centered by center of mass, embedded in 28×28, flattened row-major, grayscale, static, isolated, and stripped of all context.

Samson's notebook does not question this frame. It accepts it. It loads the data, flattens it, normalizes it to [0,1], and feeds it forward. This is not a criticism — it is precisely what makes the notebook useful. The frame is held constant so that the network's behavior can be studied.

But we will not hold it constant. Throughout the chapters that follow, we will periodically ask: *What if the frame were different?* What if the images were 28×80? What if they were not centered? What if the flattening were column-major? What if the pixels were not grayscale but represented pressure, velocity, or stroke order? Each of these questions reveals that the network's "understanding" is inseparable from the frame's assumptions.

The network does not learn to recognize digits. It learns to recognize **MNIST digits** — a very specific, very narrow slice of the world. This is not failure. It is the nature of all learning. The question is whether the learner knows the boundaries of its own frame.

---

### IV. The Journey Ahead

This book is structured as a Parliament — thirty-one chapters, each giving voice to one Domain Neuron from the `statisticaldn` package. Each chapter will:

1. **Introduce the DN** — its identity, its family, its subjective narrative.
2. **Place it in the MNIST experiment** — show exactly where and how it operates in Samson's network.
3. **Let it testify** — give it the microphone to describe what it sees when it looks at the data, the weights, the gradients, the loss.
4. **Reveal its blind spot** — show what it cannot see, what the frame hides from it, what another DN sees that it does not.
5. **Connect to the TensorWrap** — demonstrate how the same DN, when wrapped in multi-dimensional context, speaks differently. A 1D Mean that sees only flattened pixels is not the same Mean that sees rows, columns, or channels.

The chapters are grouped by family:

- **The Descriptors** (Mean, Variance, StdDev, Covariance, Correlation) — What do the raw pixels look like? What is their structure before any network touches them?
- **The Transformers** (ReLU, Sigmoid, Tanh, Softmax, GELU) — How does the network reshape the signal as it flows through?
- **The Judges** (MSE, CrossEntropy, BCE) — How does the network measure its own error?
- **The Stabilizers** (BatchNorm, LayerNorm, RMSNorm) — How does the network keep its internal signals from collapsing or exploding?
- **The Sculptors** (L2, L1, Dropout) — How does the network constrain itself to prevent overfitting?
- **The Navigators** (SGD, Momentum, Adam) — How does the network find its way down the loss landscape?
- **The Starters** (Xavier, He) — How does the network begin its journey? What does it mean to be born with random weights?
- **The Attention** (ScaledDotProductAttention) — How would attention change the story? (Samson's network does not use it, but we will imagine what would happen if it did.)
- **The Samplers** (TopK, Temperature) — How does the network choose what to say, given what it believes?
- **The Evaluators** (Accuracy, Precision, Recall, F1) — How do we, the experimenters, judge the network's performance? And what do our judgments reveal about our own frames?

---

### V. A Note on the Code

The code in this book is written in Go, using the `statisticaldn` and `tensorwrap` packages we have built. This is not because Go is the best language for neural networks — it is not. It is because Go forces clarity. There are no hidden autograd engines. There is no `model.fit()` that obscures the forward and backward passes. Every matrix multiplication, every activation, every gradient update is explicit.

Where Samson's notebook uses NumPy's `@` operator and broadcasting magic, we will write the equivalent Go code using our DNs. The logic is identical. Only the syntax differs. And in that difference, we gain something: the ability to attach a `Subjective` field to every operation, to give every matrix multiplication a voice.

---

### VI. The First Image

Let us meet our first digit. It is the one at index 0 of the MNIST test set. Samson's notebook reveals it: **a 7**.

It is 784 numbers, each between 0 and 255. When reshaped to 28×28, it looks like a handwritten seven — a vertical stroke on the left, a horizontal stroke across the top. When flattened, it is a sequence of numbers: mostly zeros (background), some mid-range values (the gray edges of the stroke), and a few high values (the dark core of the ink).

To **Xavier**, this image is irrelevant. Xavier only cares about the weights, about giving them the right variance to survive the first forward pass.

To **Mean**, this image is 784 numbers averaging to some value around 0.13 (after normalization). Mean sees the darkness of the digit against the white background.

To **ReLU**, this image does not exist yet. ReLU only sees the 10 values produced by the hidden layer's linear transformation.

To **Softmax**, this image is even further removed. Softmax only sees the 10 output scores and turns them into probabilities.

To **Accuracy**, this image is a single bit: correct or incorrect. The 7 was guessed correctly. Accuracy increments by 1.

Each DN sees a different world. Each world is real. None is complete.

This is the Parliament of Measures. And the digit 7 is our first witness.

Let the testimony begin.

---

*"The network does not see the digit. It sees the shadow of the digit cast by the frame. Our task is not to condemn the shadow, but to understand the light that created it."*
