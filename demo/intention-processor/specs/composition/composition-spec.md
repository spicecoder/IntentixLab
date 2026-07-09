Compose the output of DN_Login with the input of DN_Histogram.

The composition is not a CPUX runtime yet. It is a recording-friendly demonstration that Signals compose:

DN_Login emits S_user_authenticated.
S_user_authenticated is combined with S_generate_histogram.
DN_Histogram emits S_histogram_generated.
