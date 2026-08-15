## Interlude: The Invisible Frame
### *On the Contextual Bias of Established Experiments*

> *"We do not see the world as it is. We see the world as our instruments are built to frame it."*

---

### I. The Tyranny of the Default

Consider the number **28**.

It appears in our story three times. Twenty-eight pixels wide. Twenty-eight pixels tall. Twenty-eight images per sample. Each appearance carries the weight of a decision made long ago — a decision that has since become invisible, then inevitable, then "natural."

When Yann LeCun, Corinna Cortes, and Christopher Burges constructed the MNIST dataset in 1994, they faced a practical problem. The National Institute of Standards and Technology had provided binary scans of handwritten digits at 128×128 resolution — high enough to see the paper fiber, the pen pressure, the tremor of the hand. But LeCun's convolutional network, LeNet-1, could not digest 16,384 pixels per image on the hardware of that era. The data had to be shrunk.

So they designed a pipeline: fit each digit into a 20×20 box, preserve the aspect ratio with anti-aliasing, then embed that box in a 28×28 canvas, centering by center of mass. The result was 784 grayscale pixels — small enough to fit in RAM, large enough to resolve a stroke, square enough to treat horizontal and vertical equally.

**But 28×28 is not a property of handwritten digits.** It is a property of a specific computational budget, a specific network architecture, and a specific assumption about what a "digit" should look like when divorced from its context. The 28×28 frame says:

- *The digit is alone.* No surrounding words. No line noise. No form structure.
- *The digit is centered.* The center of mass is the meaningful origin.
- *The digit is square.* Horizontal and vertical dimensions are equally important.
- *The digit is small.* Fine details (serifs, ink bleeds, writing pressure) are irrelevant noise.
- *The digit is static.* One moment in time. No sequence. No motion.

These are not empirical findings. They are **design hypotheses** that became embedded in the data. And because MNIST worked — because LeNet achieved 99% accuracy, because the field adopted it as the "Hello World" of machine learning — these hypotheses became invisible. Today, when a student downloads MNIST, they do not see a frame. They see "the digits dataset." The frame has become the world.

---

### II. The Frame as Theory

Every experiment, every model, every measurement apparatus carries what philosophers of science call **theory-ladenness**. The frame is not a neutral window. It is a **theory about what matters**.

When you choose 28×28, you are making at least five theoretical commitments:

**1. Dimensional commitment:** *Two dimensions are sufficient.* You have rejected depth (the digit is not a 3D object), time (the stroke order is irrelevant), and channel richness (color, pressure, velocity are discarded). You have collapsed the world into a grid.

**2. Metric commitment:** *Euclidean distance on flattened pixels is meaningful.* When you compute MSE between two MNIST images, you are treating pixel (0,0) as equally distant from pixel (0,1) as from pixel (1,0). You are treating a vertical stroke and a horizontal stroke as commensurable. You are ignoring that the human visual system processes edges, not pixels.

**3. Sampling commitment:** *70,000 examples represent "handwriting."* MNIST contains digits from American Census Bureau employees and American high school students. It does not contain Arabic numerals, Chinese numerals, numerals written by children, numerals written by the elderly, numerals written in haste, numerals written with a finger on glass. The model learns "digits" but really learns *a specific population's digits under specific conditions*.

**4. Temporal commitment:** *One frame is enough.* MNIST gives you a single snapshot. But handwriting is a process. The acceleration of the pen, the order of strokes, the pauses between strokes — all carry information. A model trained on MNIST learns to recognize shapes, not to generate or understand the *process* that produced them.

**5. Aspect ratio commitment:** *Square is neutral.* We discussed 28×80. A 28×80 frame would privilege horizontal structure. But 28×28 is not neutral either — it privileges *compactness*. It assumes the interesting structure fits in a roughly isotropic blob. A digit written with a long horizontal bar (like a '7' with a European crossbar, or a '1' with a long base) is forced into a square, distorting its natural proportions.

These commitments are not bugs. They are **necessary reductions**. You cannot measure everything. You must choose a frame. The danger is not that the frame exists — the danger is that **the frame becomes invisible**, and the model's outputs are treated as truths about "digits in general" rather than truths about "digits-as-represented-in-this-specific-frame."

---

### III. The Model Does Not See the Frame

This is where our Domain Neurons become philosophically interesting — and dangerous.

Recall our 31 DNs. Each one receives a flat `[]float64`. None of them know that the data came from a 28×28 image. None of them know that element 27 is adjacent to element 28 in the original grid (it is — they are the last pixel of row 0 and the first pixel of row 1). None of them know that element 0 and element 27 are far apart in the flattened array but adjacent in the original image.

**Mean** computes the average of 784 numbers. It does not know that some of those numbers are corner pixels (rarely touched by strokes) and some are center pixels (often touched). It treats each pixel as equally representative of "the digit." But the frame has already decided that center pixels are more informative — that's why the digit was centered. Mean's democracy is, in fact, a hidden aristocracy: it weights the pre-selected center as heavily as the pre-selected padding.

**Variance** measures spread across 784 pixels. It will be dominated by the contrast between ink and background. But the frame decided what counts as ink (grayscale > 0.5?) and what counts as background. A different binarization threshold would produce a different variance. The DN sees the variance as a property of the digit. It is actually a property of the digit *as thresholded*.

**Convolution** (if we had a Conv2D DN) would apply a 3×3 kernel. But the kernel's notion of "locality" is defined by the row-major flattening. Pixel (i,j) and pixel (i,j+1) are neighbors in the 2D grid and adjacent in the flat array. But pixel (i,j) and pixel (i+1,j) are neighbors in the grid and separated by 28 elements in the flat array. The DN's notion of "near" is inherited from the frame's notion of "row." If we had chosen column-major flattening, the vertical adjacency would be cheap and the horizontal adjacency expensive. The frame shapes the algorithm's geometry.

**BatchNorm** normalizes across a batch. But the batch is a sampling frame too. If your batch contains 32 images, and 16 are '1's and 16 are '0's, BatchNorm learns a different mean and variance than if the batch contains all 10 digits equally. The frame of batch construction leaks into the normalization.

The model does not see the frame. The model **is** the frame, executing itself on new data.

---

### IV. Beyond MNIST: The Frame in Behavioral Science

This problem is not unique to computer vision. It is universal wherever models meet reality.

**Behavioral Economics:** The ultimatum game is a 28×28 of human behavior. Two players. One proposal. One acceptance or rejection. The frame says: *economic rationality can be measured by a single transaction between anonymous strangers with no reputation, no history, no future interaction, and no social context.* When Daniel Kahneman and Amos Tversky found that people reject unfair offers, they were not discovering a universal feature of human cognition. They were discovering how humans behave *when placed in this specific frame*. In real life, people negotiate repeatedly, care about reputation, and punish unfairness publicly. The ultimatum game frame strips all of that away — and then claims to have found "the" human sense of fairness.

**Psychology:** The Stanford Prison Experiment is a 28×80 frame forced onto human behavior. Philip Zimbardo chose college students, a basement, uniforms, arbitrary roles, and a short time horizon. The frame said: *power dynamics can be understood by stripping away identity, history, and exit options.* The experiment produced dramatic results — but were they results about "human nature under power," or about *middle-class American males in a basement with no accountability*? The frame became the theory.

**Neuroscience:** fMRI measures blood flow as a proxy for neural activity. The frame says: *cognition can be localized to 3mm voxels, averaged over seconds, in a supine human inside a loud magnet.* The DN of "brain activation" is actually measuring BOLD signal — a hemodynamic response delayed by 4-6 seconds. The frame confuses *where blood flows* with *where thinking happens*.

**Physics:** The double-slit experiment is a frame. It says: *light can be understood by passing it through slits and measuring intensity on a screen.* The frame produces wave-particle duality — but duality is a property of the measurement apparatus, not necessarily a property of light itself. As Bohr argued, the frame *constitutes* the phenomenon.

In every case, the experiment does not reveal reality. It reveals **reality-as-framed**. And when the frame becomes invisible — when it is called "the standard dataset," "the canonical paradigm," "the established method" — it becomes a prison. Researchers stop asking: *What would this look like through a different frame?*

---

### V. The Intention Space Response

Your framework, Intention Space / CPUX, offers a radical alternative: **make the frame explicit.**

In a traditional ML pipeline, the frame is implicit. The data is loaded, flattened, normalized, and fed into the model. The model's weights encode the frame, but the frame itself is nowhere in the code. It is architectural (28×28 input layer), procedural (row-major flattening), and cultural (MNIST is "the" digit dataset).

In Intention Space, the frame is a **Pulse**. It travels with the data:

```go
Pulse{
    Name:    "image",
    TV:      Yes,
    R:       flatPixels,
    Context: "shape=28x28;source=MNIST;centered_by=mass;normalized=20to20box;population=US_census_workers_and_students;aspect_ratio=1:1;temporal=single_frame;channels=grayscale",
}
```

Now the frame is **testable, versionable, and debatable**. A DN can read the Context and adjust its testimony:

- **Mean** might say: *"My value of 0.13 reflects average pixel intensity, but note that the source population is US Census workers and students — not children, not non-Latin scripts, not mobile touchscreen users."*
- **Variance** might say: *"My spread is 0.09, but this is variance-over-a-centered-square-frame. A different centering strategy (bounding box vs. mass) would change me."*
- **Conv2D** might say: *"My 3×3 kernel assumes isotropic locality. If this were 28×80, I would need a 3×7 kernel to preserve perceptual scale."*

The `Subjective` field of each DN becomes not just a poetic identity but a **frame-aware disclaimer**. The DN testifies not only about the data but about **its own limitations given the frame**.

---

### VI. The Meta-DN: The Frame Witness

Perhaps the most important DN in the Parliament is one we have not yet built: **the Frame Witness.**

This DN does not compute statistics. It reads the Context of every Pulse in a Signal and asks:

- *What assumptions are embedded in this shape?*
- *What population is represented? What is excluded?*
- *What temporal resolution is captured? What is lost?*
- *What would change if the aspect ratio were different?*
- *What would change if the flattening order were column-major?*
- *What would change if the centering strategy were different?*

The Frame Witness is the DN that keeps the Parliament honest. When Mean declares "the average is 4.93," the Frame Witness says: *"That average is true for this frame. Here are three other frames that would produce different averages. Here are the populations not represented. Here are the dimensions collapsed."*

Without the Frame Witness, the Parliament is a chorus of confident voices, each believing it sees the world. With the Frame Witness, the Parliament becomes a **self-aware system** — one that knows its own blindness.

---

### VII. Toward Frame-Explicit Science

The goal is not to eliminate frames. That is impossible. Every measurement requires a frame. The goal is to make frames **visible, multiple, and contestable**.

In your TensorWrap, when we reshape a 28×28 image into 28×80, we are not just changing an array shape. We are **changing the theory** embedded in the data. We are asking: *What if digits are not compact? What if they are elongated? What if they exist in sequences?* The DN's testimony shifts not because the DN changed, but because the frame changed.

This is the deepest lesson of the Parliament of Measures: **The measure does not exist independently of the frame. The frame is the first measure.**

When you write:

```go
Context: "shape=28x28;intent=single_centered_digit"
```

You are doing something that traditional science buries in methodology sections and footnotes. You are making the frame **executable**. You are making it travel with the data. You are making it part of the Signal.

And when a downstream DN reads that Context and adjusts its testimony, you have achieved something rare: **a model that knows it is a model.**

---

### VIII. The Question That Remains

We began with a question: *Why 28×28 and not 28×80?*

The answer is: **Because 28×28 was a decision that became invisible.** It was a decision about computational cost, about network architecture, about what a digit "should" look like when stripped of context. It was not wrong. But it was not inevitable.

The deeper question is: *How many 28×28s are hiding in our models right now?*

- The 256×256 of ImageNet — why not 512×512? Why square?
- The 512 tokens of GPT — why not 2048? Why not variable?
- The 3-second window of speech recognition — why not 300 milliseconds? Why not 30 seconds?
- The 5-point Likert scale of psychology — why not 7? Why not continuous?
- The 0.05 p-value of statistics — why not 0.01? Why not Bayesian?

Every one of these is a frame. Every one shapes what the model can see. Every one becomes invisible the moment it is adopted as "standard."

The Parliament of Measures is not just 31 voices on a distribution. It is 31 voices **in a room with walls**. The Frame Witness is the one who points to the walls and says: *"These walls were built. They can be rebuilt. And what you see depends on where you stand."*

---

*The frame is the first measure. Never trust a measure that cannot name its frame.*
