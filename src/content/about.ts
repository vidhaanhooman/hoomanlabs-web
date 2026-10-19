/**
 * /about. Built only from what the site already says (the mission line from
 * Careers, the product's principles); everything about the company itself
 * (the story, contact details) is a placeholder, marked TO CONFIRM.
 */
export const aboutPage = {
  seo: {
    title: "About HoomanLabs",
    description: "We build AI employees that hold real customer conversations, in their language, on every channel.",
  },
  crumb: "About",
  title: "We build the people your customers talk to.",
  line: "HoomanLabs makes AI employees that hold real customer conversations, in their language, on every channel, and a platform to build, test and run them.",

  /** TO CONFIRM: the real story, in the founders' words. Placeholder copy, written to length. */
  story: {
    label: "Our story",
    title: "Why we started HoomanLabs.",
    paragraphs: [
      "Most customer calls are about something simple: a bill, a booking, a delivery. Yet they still mean hold music, long queues and repeating yourself to the next person.",
      "We started HoomanLabs to change that: agents that pick up every call, speak the customer's language, follow your process and get the job done, with your team there for the moments that need a person.",
      "Today teams use HoomanLabs to answer, call and follow up with customers every day, and to test and improve every conversation before and after it happens.",
    ],
  },

  principles: {
    label: "How we build",
    title: "What we hold ourselves to.",
    items: [
      { title: "Calm over clever", body: "Customers should feel looked after, not impressed. We choose the quiet, clear option." },
      { title: "Real calls, not demos", body: "We judge our work by how it sounds on a noisy line at 9pm, not in a slide." },
      { title: "Own the outcome", body: "A call isn't done when it ends. We care whether the payment landed and the booking stuck." },
      { title: "Tested before it talks", body: "Every change is tried against real scenarios before it reaches a customer." },
    ],
  },

  /** Office address confirmed. TO CONFIRM: the general email. */
  contact: {
    label: "Contact",
    title: "Get in touch.",
    items: [
      { label: "Office", value: "HD-111, WeWork Salarpuria Magnifica", note: "Old Madras Road, Mahadevapura Extension, Bengaluru, Karnataka 560016" },
      { label: "General", value: "hello@hoomanlabs.com", href: "mailto:hello@hoomanlabs.com" },
      { label: "Careers", value: "careers@hoomanlabs.com", href: "mailto:careers@hoomanlabs.com" },
    ],
  },
}
