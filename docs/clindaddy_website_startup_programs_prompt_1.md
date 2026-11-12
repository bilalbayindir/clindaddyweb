# Change request — clindaddy.com: add NVIDIA Inception and AWS Activate

ClinDaddy LLC has been accepted into **NVIDIA Inception** and **AWS Activate** (Founders tier, plus the AWS Activate credit offer for NVIDIA Inception members). Update the website to show this accurately. Do all the work yourself (branch, edit, build, test, commit, push, open and merge the PR); I only give approval.

## 1. Add AWS Activate next to the existing NVIDIA Inception badge

The site already shows the official NVIDIA Inception badge (`/images/nvidia-inception-badge-light.svg`) in two places. Keep it as it is, and add the AWS Activate badge beside it in both:

- **Home page**, "Recognition" block near the bottom:
  - Rename the label to "Programs" so it matches /trust.
  - Change the text to: "ClinDaddy is a member of the NVIDIA Inception program and AWS Activate."
- **/trust**, "Programs" section: make the same text change.

- **What it shows:** the two badges side by side:
  - **NVIDIA Inception:** keep the current badge file and alt text.
  - **AWS Activate:** use the **AWS Activate logo** from aws.amazon.com/activate/logo-guidelines, never the main AWS "smile" logo. Save it as `/images/aws-activate-badge.png`. If you can't get the file, use a placeholder and tell me.
- **Badge sizing and styling:**
  - Each badge must be visibly smaller than the ClinDaddy logo.
  - Don't change the badges' colours or proportions, and don't recolour them for dark mode. If the dark background makes one hard to see, put it on a white tile.
  - Give each badge alt text: "NVIDIA Inception Program member" and "AWS Activate member".
- **Caption under the strip:** "ClinDaddy is a member of the NVIDIA Inception program and AWS Activate."
- **Links:**
  - The NVIDIA badge may link to nvidia.com/startups.
  - The AWS badge must **not** link to the AWS sign-up page. Either don't link it, or link to aws.amazon.com/activate.

## 2. Wording rules (apply site-wide)

- **Allowed:** "member of NVIDIA Inception", "member of AWS Activate", "participant in AWS Activate".
- **Never use:** "partner", "partnered with", "backed by", "funded by", "invested in by", "endorsed by", "certified by", "powered by NVIDIA", "built on AWS".
- **Don't** mention credit amounts or dollar values.
- **Don't** say the website or the product is hosted on AWS. It isn't today. We may later say "pilot environments run on AWS", but only once that is true.
- The existing NVIDIA text already follows these rules. Keep it that way.

## 3. Also update

- **Footer trademark notice (all pages):** after the NVIDIA notice, add: "Amazon Web Services, AWS and the AWS Activate logo are trademarks of Amazon.com, Inc. or its affiliates."
- **/investors:** add one line in the company or traction area: "Member of NVIDIA Inception and AWS Activate." No credit amounts. Keep the existing honest "no customers yet" wording unchanged.
- **/about:** add the same one line.
- **Social preview and meta tags:** don't add the logos to OG images.

## 4. Check before you merge

- Run the site build and lint with no errors.
- Check mobile at 375px: the badges wrap and keep their proportions, with no horizontal scroll.
- Check that both themes render, if the site has dark mode.
- Search the repo for `partner`, `backed`, `powered by`, `AWS` and `NVIDIA`, and paste every hit into the PR description, so I can see each use is compliant.
- In the PR description, list which badge files are real and which are placeholders I still need to supply.
