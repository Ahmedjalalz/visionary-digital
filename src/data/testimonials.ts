export interface Testimonial {
  id: string;
  projectSlug: string;
  projectName: string;
  category: "Education" | "Healthcare & Maternity" | "Widows & Families" | "Skills & Livelihoods";
  name: string;
  role: string;
  location: string;
  quote: string;
  impactHighlight: string;
  partnerId?: string;
  partnerName?: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "test-edu",
    projectSlug: "education-for-all",
    projectName: "Education For All",
    category: "Education",
    name: "Amina Bibi",
    role: "Mother of three students",
    location: "Sheikhupura District, Punjab",
    quote:
      "When my husband fell ill, I was told my daughters would have to leave schooling. ELF came to our doorstep, covered their fees, uniforms and books without a single condition. Today all three are at the top of their grades.",
    impactHighlight: "3 children retained in continuous schooling",
    partnerName: "Happy to Help Foundation UK",
  },
  {
    id: "test-bags",
    projectSlug: "school-bags",
    projectName: "School Bags Distribution Program",
    category: "Education",
    name: "Master Tariq Mehmood",
    role: "Headmaster, Community Primary School",
    location: "Rural Kasur, Punjab",
    quote:
      "A child without a school bag and geometry box feels incomplete and stays away from assembly out of shame. The moment these sturdy, packed bags arrived with student tracking IDs, attendance leaped from 62% to 95%.",
    impactHighlight: "95% school attendance rate achieved",
    partnerName: "School in a Bag UK",
  },
  {
    id: "test-midwifery",
    projectSlug: "midwifery-program",
    projectName: "Midwifery Training Program",
    category: "Healthcare & Maternity",
    name: "Salma Parveen",
    role: "Certified Community Midwife",
    location: "Chunian Tehsil, Kasur",
    quote:
      "Before ELF's 18-month midwifery cohort and clinical toolkit, women in our cluster had to travel two hours on tractor trolleys to reach emergency labor wards. In the last year, I safely delivered 48 healthy babies right in our village.",
    impactHighlight: "48 safe village deliveries in 12 months",
    partnerName: "Women & Girls First USA",
  },
  {
    id: "test-music",
    projectSlug: "music-of-the-heart",
    projectName: "Music of the Heart Project",
    category: "Education",
    name: "Zainab Rashid",
    role: "Creative Arts Facilitator",
    location: "Allama Iqbal Town Center, Lahore",
    quote:
      "Trauma and destitution silence a child faster than anything else. Through the instruments donated by international sponsors, we watched children who had not spoken in weeks begin to sing, play harmonium, and smile again.",
    impactHighlight: "120+ vulnerable children engaged in creative expression",
    partnerName: "Hungry for Music USA",
  },
  {
    id: "test-health",
    projectSlug: "health-wash-community-wellbeing",
    projectName: "Health, WASH & Community Wellbeing",
    category: "Healthcare & Maternity",
    name: "Ghulam Rasool",
    role: "Patient & Village Elder (Age 68)",
    location: "Nankana Sahib District",
    quote:
      "I was going blind from cataracts and had no savings left for treatment. The ELF medical camp doctors examined me, gave me free prescription medication, and arranged my eye surgery with zero expense to my family.",
    impactHighlight: "Free consultation, eye surgery & full medicine course",
    partnerName: "Vision for Asia Germany",
  },
  {
    id: "test-wash",
    projectSlug: "health-wash-community-wellbeing",
    projectName: "Health, WASH & Community Wellbeing",
    category: "Healthcare & Maternity",
    name: "Surraiya Manzoor",
    role: "Primary School Administrator",
    location: "Okara Border Belt, Punjab",
    quote:
      "Our children used to fall sick constantly with typhoid and stomach infections from shallow groundwater. ELF installed deep-bore solar filtration and modern washrooms. Sick days dropped to near zero within two terms.",
    impactHighlight: "Clean drinking water for 450+ school children",
    partnerName: "Vision for Asia Germany",
  },
  {
    id: "test-pregnancy",
    projectSlug: "health-wash-community-wellbeing",
    projectName: "Health, WASH & Community Wellbeing",
    category: "Healthcare & Maternity",
    name: "Kainat Zahra",
    role: "Young Mother",
    location: "Sheikhupura Rural",
    quote:
      "ELF provided monthly prenatal vitamins, iron supplements, and direct check-ups throughout my pregnancy. Having a registered lady health visitor check on me gave me the confidence that my child would be born healthy.",
    impactHighlight: "Healthy full-term birth and postpartum care kit",
    partnerName: "Consistent Life Network USA",
  },
  {
    id: "test-hope-widows",
    projectSlug: "hope-and-freedom-for-widows-headed-families",
    projectName: "Hope and Freedom",
    category: "Widows & Families",
    name: "Razia Sultana",
    role: "Widow & Tailoring Entrepreneur",
    location: "Lahore, Punjab",
    quote:
      "When my husband passed, I had no savings and four young dependents. ELF did not just drop food and leave; they paid my children's fees and gifted me an industrial sewing machine with fabric supplies. Now I take commercial stitching orders.",
    impactHighlight: "Independent monthly income of PKR 42,000+",
    partnerName: "Barnabas Aid UK",
  },
  {
    id: "test-widows-welfare",
    projectSlug: "hope-and-freedom-for-widows-headed-families",
    projectName: "Hope and Freedom",
    category: "Widows & Families",
    name: "Bilquis Begum",
    role: "Welfare Beneficiary (Age 72)",
    location: "Raza Block, Lahore",
    quote:
      "At my age, standing in humiliating queues for ration handouts breaks the spirit. ELF delivers our grocery packages and monthly emergency stipend directly to our door with respect, every month on time without fail.",
    impactHighlight: "Continuous dignity-first monthly family food basket",
    partnerName: "Azadi Freedom Germany",
  },
  {
    id: "test-digital-skills",
    projectSlug: "community-digital-skills-developments",
    projectName: "Community & Digital Skills Developments",
    category: "Skills & Livelihoods",
    name: "Hamza Tariq",
    role: "Cohort Graduate & Freelance Web Developer",
    location: "Lahore Suburbs",
    quote:
      "I had never touched a modern computer until the ELF IT lab opened. In 6 months, their instructors taught me office software, digital graphics, and client communications. Today I earn online from international clients.",
    impactHighlight: "Earning sustainable foreign remittance independently",
    partnerName: "Youth for Christ International USA",
  },
  {
    id: "test-skill-dev",
    projectSlug: "community-digital-skills-developments",
    projectName: "Community & Digital Skills Developments",
    category: "Skills & Livelihoods",
    name: "Muhammad Bilal",
    role: "Vocational Electrical Graduate",
    location: "Kasur District",
    quote:
      "I was working as an underpaid day laborer with zero job security. ELF’s 4-month technical electric wiring course gave me certified training and a starter toolbag. I am now a certified electrical subcontractor.",
    impactHighlight: "Permanent trade certification & full kit sponsorship",
    partnerName: "TBF Trust UK",
  },
  {
    id: "test-capacity",
    projectSlug: "capacity-building",
    projectName: "Capacity Building Program",
    category: "Skills & Livelihoods",
    name: "Zafar Iqbal",
    role: "District Field Supervisor",
    location: "Punjab Field Operations",
    quote:
      "Sustainable charity is not about outside experts coming and going; it is about training locals who stay. ELF equips us with transparent record-keeping, supply chain tracking, and disaster response skills.",
    impactHighlight: "35+ grassroots field leaders certified in governance",
    partnerName: "Paul Aid Trust New Zealand",
  },
];
