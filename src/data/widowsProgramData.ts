export interface WidowTestimony {
  id: string;
  name: string;
  image: string;
  role: string;
  story: string;
  debt: string;
  status: string;
  quote: string;
}

export interface WidowFaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface SponsorshipPillar {
  step: string;
  title: string;
  subtitle: string;
  costDetail: string;
  description: string;
  deliverables: string[];
}

export interface ImpactPillar {
  title: string;
  subtitle: string;
  badge: string;
  description: string;
}

export const sponsorshipPillars: SponsorshipPillar[] = [
  {
    step: "01",
    title: "Debt Relief & Legal Protection",
    subtitle: "Breaking the Generational Bonds",
    costDetail: "Direct Kiln Owner Negotiation",
    description:
      "Working through verified community legal partners to negotiate and permanently liquidate bonded debts with brick kiln owners, obtaining signed legal release papers that guarantee the family can never be claimed or re-enslaved.",
    deliverables: [
      "Official legal bond cancellation certificate",
      "Direct negotiation with kiln owners",
      "Protection from harassment and forced labor",
    ],
  },
  {
    step: "02",
    title: "Emergency Living Stipend & Housing",
    subtitle: "Immediate Shelter and Food Security",
    costDetail: "6 Months Paid Rent & Ration Packs",
    description:
      "Upon liberation, families are safely relocated away from kiln compounds into secure rental homes. We provide 6 full months of prepaid rent, monthly staple nutrition hampers (flour, oil, pulses, sugar, tea), and clean beddings.",
    deliverables: [
      "Safe, dry rental home (6 months rent fully covered)",
      "Nutritious monthly emergency food hampers",
      "Charpais, mattresses, cookware, and warm blankets",
    ],
  },
  {
    step: "03",
    title: "Comprehensive Healthcare & Healing",
    subtitle: "Addressing Kiln-Induced Chronic Illness",
    costDetail: "Screenings, Prescriptions & Care",
    description:
      "Kiln labor inflicts severe respiratory illnesses, eye trauma, hypertension, and malnutrition. Our medical partners provide immediate diagnostics, Lady Health Visitor home consultations, and ongoing prescription medicine.",
    deliverables: [
      "Full physician checkups and diagnostic lab tests",
      "Free chronic disease medications & inhalers",
      "Maternal and pediatric nutritional rehabilitation",
    ],
  },
  {
    step: "04",
    title: "Education & Bright Futures",
    subtitle: "From Child Labor to the Classroom",
    costDetail: "Tuition, Uniforms & Complete Kits",
    description:
      "Children who previously molded bricks from dawn to dusk are enrolled into accredited community schools. We cover tuition, state textbooks, notebooks, tailored uniforms, shoes, and trackable school bags.",
    deliverables: [
      "Immediate school registration & tuition fees",
      "Tailored school uniform pairs and sturdy shoes",
      "Full academic year of stationery and backpacks",
    ],
  },
  {
    step: "05",
    title: "Sustainable Livelihoods & Enterprise",
    subtitle: "Permanent Economic Independence",
    costDetail: "Capital Assets & Vocational Tools",
    description:
      "To ensure families never depend on charity or succumb to predator loans again, we equip widowed mothers with income-generating capital—including industrial sewing machines, mobile grocery kiosks, or livestock.",
    deliverables: [
      "Heavy-duty sewing machines with fabric startup kits",
      "Mobile vegetable or grocery kiosk setup",
      "Basic financial literacy and budget mentoring",
    ],
  },
];

export const measurableImpacts: ImpactPillar[] = [
  {
    title: "Breaking Chains of Bonded Labor",
    subtitle: "Complete Freedom",
    badge: "100% Discharged",
    description:
      "Permanently terminating generational debt so that widows and their children walk out of the brick kilns forever with legally certified freedom.",
  },
  {
    title: "Guaranteed Safety and Shelter",
    subtitle: "Safe Haven",
    badge: "6 Months Paid",
    description:
      "Relocating vulnerable mothers from unsafe mud hovels on kiln grounds into dignified urban and community rental homes with clean water and electricity.",
  },
  {
    title: "Securing a Child's Future",
    subtitle: "Restored Childhood",
    badge: "Classroom Enrolment",
    description:
      "Replacing soot and heavy clay molds with pencils, notebooks, and teacher mentorship, breaking the illiteracy trap for the next generation.",
  },
  {
    title: "Economic Self-Reliance",
    subtitle: "Dignified Income",
    badge: "Micro-Business",
    description:
      "Providing productive assets (sewing machines, retail kiosks) enabling widowed mothers to generate 3,000–6,000 PKR weekly from safe home environments.",
  },
  {
    title: "Restoring Dignity & Healing",
    subtitle: "Spiritual & Emotional Peace",
    badge: "Holistic Care",
    description:
      "Offering patient psychological companionship, respect, and pastoral support after years of verbal abuse and grueling manual exhaustion.",
  },
];

export const widowsTestimonies: WidowTestimony[] = [
  {
    id: "shehnaz-anayat",
    name: "Shehnaz Anayat & Shavita",
    image: "/images/widows/testimonies/1-shehnaz-anayat.jpg",
    role: "Widowed Mother & Daughter",
    story:
      "Shehnaz and her daughter Shavita were trapped in kiln labor following the sudden death of her husband. Left without economic security, they were crushed under compounded debts to kiln managers. Through ELF sponsorship, their debt was fully cleared, unlocking dignity, safe housing, and school enrollment for young Shavita.",
    debt: "Bonded kiln debt discharged",
    status: "Liberated & Home Stabilized",
    quote:
      "My daughter and I can finally sleep without the terror of the kiln overseer pounding on our door. We are free.",
  },
  {
    id: "sukhnari-arif",
    name: "Sukhnari Arif",
    image: "/images/widows/testimonies/2-sukhnari-arif.jpg",
    role: "Widow & Mother of 4 Children",
    story:
      "After her husband died from an untreated chronic illness, Sukhnari became solely responsible for four young children. To survive and buy food, she entered the brick kilns under high-interest loans. ELF stepped in to liquidate her debt in full and funded a home-based sewing workstation.",
    debt: "Full kiln debt discharged",
    status: "Independent Micro-Tailor",
    quote:
      "I am now able to feed my children with honest earnings from my sewing machine rather than molding bricks under the scorching sun.",
  },
  {
    id: "naila-vikram",
    name: "Naila Vikram Shan",
    image: "/images/widows/testimonies/18-naila-vikram.jpg",
    role: "Mother of Alisha (5) & Jessica (2)",
    story:
      "Naila lost her husband to kidney disease after months of painful dialysis. To pay for hospital care, they borrowed 150,000 PKR from a kiln owner. Working 6 hours daily alone with two toddlers, her remaining debt was 70,744 PKR. ELF cleared the debt and provided an emergency living allowance.",
    debt: "70,744 PKR remaining loan cleared",
    status: "Transitional Support & Healthcare",
    quote:
      "Surviving was tough because my children are still tiny. God gave me rest and peace through this foundation.",
  },
  {
    id: "razia-arjun",
    name: "Razia Arjun",
    image: "/images/widows/testimonies/4-razia-arjun.jpg",
    role: "76 Years Old Widowed Matriarch",
    story:
      "Razia worked alongside her husband for 35 years until his death left her alone with grief and family responsibilities. To secure her daughter's marriage and shelter, she took a 150,000 PKR loan, leaving 95,000 PKR in bonded liability while working 7 hours a day despite elderly frailty.",
    debt: "95,000 PKR bonded debt discharged",
    status: "Full Debt Discharge & Elder Care",
    quote:
      "Even at my age, I held onto hope. I am no longer alone in my darkest moments; God has provided brighter days.",
  },
  {
    id: "bashira-arif",
    name: "Bashira Arif",
    image: "/images/widows/testimonies/50-bashira-arif.jpg",
    role: "Mother of 4 (Caregiver to disabled son)",
    story:
      "Her husband died of blood cancer 18 years ago, forcing her sons to abandon school for the kilns. Her son Faris has lived with severe mental disability since birth. Suffering from hypertension and diabetes without electricity or clean water, ELF provided debt relief, medicine, and living stipends.",
    debt: "50,000 PKR loan cleared",
    status: "Medical Stipend & Safe Living",
    quote:
      "God knows the plans He has for us—plans to give us hope and a future. We have seen that promise fulfilled.",
  },
  {
    id: "suriya-barkat",
    name: "Suriya Barkat",
    image: "/images/widows/testimonies/21-suriya-barkat.jpg",
    role: "Widowed Mother of 3",
    story:
      "Suriya endured unrelenting kiln bondage following her husband's death. ELF negotiated complete debt cancellation, paid 6 months of housing rent, and provided startup capital for a home poultry and micro-dairy enterprise.",
    debt: "Generational debt broken",
    status: "Self-Reliant Dairy & Poultry",
    quote:
      "Freedom has given my children a mother who can smile again. We are building a life with our own hands.",
  },
  {
    id: "parveen-aslam",
    name: "Parveen Aslam",
    image: "/images/widows/testimonies/17-parveen-aslam.jpg",
    role: "Widowed Mother of 3",
    story:
      "Trapped by arbitrary deductions and interest rates at a peri-urban kiln, Parveen could never lower her debt. ELF intervened with legal backing, cleared the principal sum, and gifted her a tailoring machine with starter fabrics.",
    debt: "Predatory kiln loan cancelled",
    status: "Tailoring & Craft Business",
    quote:
      "My hands now hold clean cloth and colorful thread instead of black coal and damp mud.",
  },
  {
    id: "raees-boota",
    name: "Raees Boota Family",
    image: "/images/widows/testimonies/16-raees-boota.jpg",
    role: "Widow & School-Age Children",
    story:
      "Destitute after the loss of the household head, this entire family was absorbed into bonded kiln servitude. ELF achieved complete legal release, relocated them safely, and enrolled the children back in school with full supplies.",
    debt: "Complete legal bond release",
    status: "Children Enrolled in School",
    quote:
      "Education was stolen from us in the mud pits, but ELF brought our children back into the classroom.",
  },
  {
    id: "shameem-james",
    name: "Shameem James Masih",
    image: "/images/widows/testimonies/41-shameem-james-masih.jpg",
    role: "Widowed Grandmother & Guardian",
    story:
      "Caring for orphaned grandchildren after her husband and son passed, Shameem faced imminent eviction and malnutrition. ELF provided immediate living stipends, emergency food hampers, and pediatric clinical checkups.",
    debt: "Eviction & medical debt cleared",
    status: "Family Dignity Restored",
    quote:
      "My grandchildren now have three healthy meals a day and a secure, peaceful roof over their heads.",
  },
  {
    id: "razia-manzoor",
    name: "Razia Manzoor",
    image: "/images/widows/testimonies/25-razia-manzoor.jpg",
    role: "Widowed Mother",
    story:
      "Widowed in an isolated brick kiln cluster, Razia suffered withheld wages and verbal coercion. ELF secured her official legal release deed and equipped her with an urban mobile grocery kiosk.",
    debt: "Full debt liquidation",
    status: "Mobile Kiosk Owner",
    quote:
      "I am an independent working woman now. Nobody can force my children into bonded servitude ever again.",
  },
  {
    id: "azrah-bashir",
    name: "Azrah Bashir",
    image: "/images/widows/testimonies/49-azrah-bashir.jpg",
    role: "Widowed Mother",
    story:
      "Azrah struggled under compounded debt from expensive hospitalizations before her husband passed away. ELF stepped in with complete medical bill settlement, debt liquidation, and regular welfare food hampers.",
    debt: "Hospitalization debt cleared",
    status: "Healthcare & Monthly Aid",
    quote:
      "The heavy darkness that hung over our lives has been lifted. We can finally breathe in freedom.",
  },
];

export const widowsFaqs: WidowFaqItem[] = [
  {
    id: "faq-widespread",
    question: "How widespread is the problem of bonded labor in Pakistan?",
    answer:
      "Although officially outlawed, the brick manufacturing sector suffers from an acute absence of regulatory oversight. It is estimated that Pakistan has approximately 20,000 brick kilns operating across the country, whose workforce is predominantly trapped in generational debt bondage.",
  },
  {
    id: "faq-legal",
    question: "Is bonded labor legal in Pakistan?",
    answer:
      "Bonded labor was formally prohibited under the Bonded Labour System (Abolition) Act of 1992. However, kilns continue to operate with bonded workers due to weak regulatory enforcement, corruption, and the social dominance of kiln proprietors. This modern form of slavery remains deeply entrenched in rural and peri-urban economic structures.",
  },
  {
    id: "faq-debt-amount",
    question: "What is the typical amount of debt?",
    answer:
      "Loan amounts vary widely from several hundred to thousands of euros depending on family size and medical emergencies. On average, the vulnerable families supported through our interventions carry an accumulated debt of approximately €800 to €1,000 (roughly 240,000 to 300,000 PKR).",
  },
  {
    id: "faq-meetings",
    question: "How do you organize meetings with the brick kiln owners?",
    answer:
      "To engage brick kiln owners constructively, we partner with reputable, long-standing local community leaders who have developed direct access and mutual respect with kiln owners across Pakistan. These partners proactively convene negotiations to agree on debt liquidation and secure legal release documentation.",
  },
  {
    id: "faq-leave-kilns",
    question: "Do individuals whose debts have been settled typically leave the brick kilns?",
    answer:
      "Yes. In the vast majority of cases, families depart the brick kilns immediately once their debts are cleared. Remaining in the kiln environment carries a high risk of re-exploitation, as daily survival in the compounds is structurally engineered around indebtedness.",
  },
  {
    id: "faq-post-release-support",
    question: "What steps do you take to support them after their bonded debt has been settled?",
    answer:
      "True freedom requires viable alternatives, not merely the cancellation of debt. Following release, we assist families in relocating to safer community and urban areas with genuine employment opportunities. During this critical transition, we cover 6 months of housing rent, supply staple food hampers, and deliver essential medical care. For long-term independence, we fund vocational training and micro-enterprise capital (such as tailoring workstations or mobile grocery kiosks) so families build resilient, self-directed livelihoods.",
  },
  {
    id: "faq-daily-wage",
    question: "How much is their daily wage?",
    answer:
      "Compensation ranges nominally between €2.70 and €4.50 (approx. 800 to 1,350 PKR) for molding 1,000 bricks. However, owners routinely deduct significant portions for loan interest, deductions, and inflated food rations, leaving workers with as little as €1.35 per day to sustain an entire family.",
  },
  {
    id: "faq-children-age",
    question: "At what age do children typically start working?",
    answer:
      "While work entry varies by family circumstance, young adolescents are routinely expected to assist their parents in carrying clay and turning bricks. Frequently, children begin assisting at kilns as young as 7 to 9 years old, completely forfeiting their right to an education.",
  },
  {
    id: "faq-financial-education",
    question: "Does your organization offer financial education?",
    answer:
      "Yes. Our team and local field partners provide foundational financial literacy mentoring to newly liberated families, helping them manage daily household income, understand savings, budget for nutrition, and avoid predatory lending.",
  },
  {
    id: "faq-hostility",
    question: "Does the departure of a worker cause hostility from brick factory owners?",
    answer:
      "We operate through highly respected local liaisons with decades of community experience. In every case, negotiations are handled discreetly and framed as mutually agreeable commercial settlements. This sensitive, professional engagement ensures the physical safety of the family and prevents retaliatory hostility.",
  },
  {
    id: "faq-envy",
    question: "Do other families feel envy when a family is liberated?",
    answer:
      "Debt settlements are executed as discreetly as possible to avoid unnecessary tension among the broader kiln workforce. Nonetheless, observing a neighboring family gain freedom naturally stirs intense yearning among those still trapped. This reality reinforces the urgency of our mission to expand sponsorship and liberate families systematically across Pakistan's 20,000 kilns.",
  },
];

export const widowsGalleryImages = {
  bottom: [
    "/images/widows/bottom/1.jpg",
    "/images/widows/bottom/2.jpg",
    "/images/widows/bottom/3.jpg",
    "/images/widows/bottom/4.jpg",
    "/images/widows/bottom/5.jpg",
    "/images/widows/bottom/6.jpg",
  ],
  scrolling: [
    "/images/widows/scrolling/1.jpg",
    "/images/widows/scrolling/2.jpg",
    "/images/widows/scrolling/3.jpg",
    "/images/widows/scrolling/4.jpg",
    "/images/widows/scrolling/5.jpg",
    "/images/widows/scrolling/6.jpg",
    "/images/widows/scrolling/7.jpg",
    "/images/widows/scrolling/8.jpg",
    "/images/widows/scrolling/9.jpg",
    "/images/widows/scrolling/10.jpg",
    "/images/widows/scrolling/11.jpg",
    "/images/widows/scrolling/12.jpg",
    "/images/widows/scrolling/13.jpg",
    "/images/widows/scrolling/14.jpg",
    "/images/widows/scrolling/15.jpg",
    "/images/widows/scrolling/16.jpg",
    "/images/widows/scrolling/17.jpg",
    "/images/widows/scrolling/18.jpg",
    "/images/widows/scrolling/19.jpg",
    "/images/widows/scrolling/20.jpg",
    "/images/widows/scrolling/21.jpg",
    "/images/widows/scrolling/22.jpg",
    "/images/widows/scrolling/23.jpg",
    "/images/widows/scrolling/24.jpg",
  ],
};
