/**
 * /privacy: the Privacy Policy, as provided by HoomanLabs (Hall5 Technologies
 * Private Limited). Text is kept word for word; only split into blocks so the
 * page can lay it out. Edit the wording here.
 */

export type Block =
  | { type: "p"; text: string }
  | { type: "h3"; text: string }
  | { type: "list"; items: { term?: string; text: string }[] }
  | { type: "table"; head: string[]; rows: string[][] }
  | { type: "address"; lines: string[] }

export type PolicySection = { title: string; blocks: Block[] }

export const privacyPage = {
  seo: {
    title: "Privacy Policy",
    description:
      "This Privacy Policy (“Policy”) governs your use of the HoomanLabs website and platform (the “Application”) provided by Hall5 Technologies Private Limited, doing business under the brand name HoomanLabs (“we,” “us,” or “our”).",
  },
  sections: [
    {
      title: "1. Introduction",
      blocks: [
        {
          type: "p",
          text: "This Privacy Policy (“Policy”) governs your use of the HoomanLabs website and platform (the “Application”) provided by Hall5 Technologies Private Limited, doing business under the brand name HoomanLabs (“we,” “us,” or “our”). This Policy explains how we collect, use, and protect information obtained through your download, registration, and/or use of the Application and affiliated services (collectively, the “Services”).",
        },
        { type: "p", text: "By accessing or using our Services, you agree to the collection and use of your information in accordance with this Policy." },
      ],
    },
    {
      title: "2. Information We Collect",
      blocks: [
        { type: "h3", text: "Information You Provide Voluntarily" },
        {
          type: "list",
          items: [
            { term: "Registration Data", text: "Name, email, phone number, username, password, and other details required for account creation." },
            { term: "Transaction Data", text: "Details on purchases, service features used, and offers." },
            { term: "Customer Support", text: "Information provided when requesting help or submitting inquiries." },
            { term: "Payment Information", text: "Credit card, bank account, or other payment method details." },
            { term: "User-Submitted Content", text: "Any data entered or uploaded through use of the Application." },
          ],
        },
        { type: "h3", text: "Voice & Communications Data" },
        {
          type: "p",
          text: "For enterprise customers enabling voice features or telephony, HoomanLabs receives audio, transcripts, call metadata, and interaction logs (“Communications Data”) solely to provide Services and improve safety. Customers are fully responsible for obtaining all necessary notices and consents from their end users before providing this data to us. HoomanLabs uses such data only in aggregated and de-identified form for service improvements, ensuring no identification of customers or end users.",
        },
        { type: "h3", text: "Sensitive Data Handling" },
        { type: "p", text: "We do not intentionally collect sensitive data unless provided by you for essential Services, and only with your clear permission." },
        { type: "h3", text: "Usage Data and Call Details" },
        {
          type: "list",
          items: [
            { term: "Call Transcripts and Recordings", text: "We collect call content. Authorized admins may access this data." },
            { term: "Caller and Recipient Numbers", text: "Phone numbers involved in calls are collected and accessible to administrators." },
          ],
        },
        { type: "h3", text: "Automatically Collected Information" },
        {
          type: "list",
          items: [
            { term: "Device and Usage Data", text: "IP address, operating system, browser type, pages visited, time spent, and other interaction data." },
            { term: "Cookies and Similar Technologies", text: "Used to track interactions and improve your experience. Disabling cookies may affect certain features." },
          ],
        },
      ],
    },
    {
      title: "3. How We Use Your Information",
      blocks: [
        { type: "p", text: "We use collected information for:" },
        {
          type: "list",
          items: [
            { term: "Provision of Services", text: "Delivering and enhancing core voice AI features." },
            { term: "User Support", text: "Addressing inquiries and providing customer assistance." },
            { term: "Payments and Transactions", text: "Processing payments and maintaining financial records." },
            { term: "Communication", text: "Sending account updates and service information." },
            { term: "Legal Compliance", text: "Meeting legal obligations and defending our rights." },
            { term: "Analytics", text: "Studying usage patterns to enhance experience and performance." },
            { term: "Safety and Fraud Prevention", text: "Detecting and preventing unauthorized use or fraudulent activity." },
          ],
        },
      ],
    },
    {
      title: "4. Sharing Your Information",
      blocks: [
        {
          type: "list",
          items: [
            { term: "No Sale or Rental", text: "We do not sell or rent your personal data for marketing purposes." },
            {
              term: "Service Providers",
              text: "Third parties assisting us (e.g., payment processors, cloud hosting providers, analytics) have access to your Personal Data only to perform Service-related services or assist us in analysing how our Service is used on our behalf and are obligated not to disclose or use it for any other purpose. The use of data by Service Providers is covered in more detail in “10. Service Providers”.",
            },
            { term: "Legal Obligations", text: "Data may be shared when required by law, court order, or government request, or to protect our rights and safety." },
            { term: "Business Transactions", text: "User data may be transferred during mergers, acquisitions, bankruptcies, or similar business events." },
            { term: "International Transfers", text: "Data may be stored or processed outside India using secure provider agreements. By using our Services, you consent to such transfers." },
          ],
        },
      ],
    },
    {
      title: "5. Data Retention",
      blocks: [
        {
          type: "list",
          items: [
            { term: "General Retention Period", text: "We keep your data as long as your account is active or as needed to provide Services." },
            { term: "Deletion Upon Request", text: "You can request deletion of your data by writing to founders@hoomanlabs.com." },
          ],
        },
      ],
    },
    {
      title: "6. Email Communications",
      blocks: [
        { type: "p", text: "HoomanLabs may contact you via email for:" },
        {
          type: "list",
          items: [
            { term: "Transactional", text: "Confirmations, alerts, service updates (required for account management)." },
            { term: "Marketing", text: "Promotional offers, announcements, surveys." },
          ],
        },
        { type: "p", text: "We may track when you open marketing emails or click links to improve Services. Transactional emails cannot be opted out of." },
        {
          type: "p",
          text: "If you would like to stop receiving marketing or promotional communications via email from HoomanLabs, you may opt out of such communications by writing to us at founders@hoomanlabs.com.",
        },
      ],
    },
    {
      title: "7. Security Measures",
      blocks: [
        {
          type: "p",
          text: "We use commercially reasonable security methods including encryption, access controls, and secure servers to protect your data. However, no system is 100% secure. By using our Services, you acknowledge that you do so at your own risk. We report data breaches to affected parties as appropriate.",
        },
      ],
    },
    {
      title: "8. Children's Privacy",
      blocks: [
        {
          type: "p",
          text: "We do not knowingly collect personal data from children under 18. If we become aware that we have collected such data, we will delete it promptly. Parents or guardians who believe we have data from a child may contact us at founders@hoomanlabs.com.",
        },
      ],
    },
    {
      title: "9. Your Rights",
      blocks: [
        {
          type: "list",
          items: [
            { term: "Access and Update", text: "You may access and update your information by logging into your account or emailing us at founders@hoomanlabs.com." },
            { term: "Deletion", text: "You may request deletion of your data, subject to legal and contractual obligations." },
          ],
        },
      ],
    },
    {
      title: "10. Service Providers",
      blocks: [
        {
          type: "p",
          text: "We may employ third party companies and individuals to facilitate our Service (“Service Providers”), provide Service on our behalf, perform Service-related services or assist us in analysing how our Service is used.",
        },
        { type: "p", text: "These third parties have access to your Personal Data only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose." },
        {
          type: "p",
          text: "You can request an up-to-date list of third-party Service Providers by emailing us at founders@hoomanlabs.com. We provide a non-comprehensive list of our Service Providers below.",
        },
        {
          type: "table",
          head: ["Sr. No.", "Name", "Category of Service Provider", "Link to Privacy Policy"],
          rows: [
            ["1", "Amazon Web Services", "Cloud, LLM & TTS service provider", "https://aws.amazon.com/privacy/"],
            ["2", "Google Cloud", "Cloud, LLM & TTS service provider", "https://cloud.google.com/privacy"],
            ["3", "Microsoft Azure", "LLM & TTS service provider", "https://azure.microsoft.com/en-us/explore/trusted-cloud/privacy"],
            ["4", "OpenAI", "LLM & TTS service provider", "https://openai.com/policies/row-privacy-policy/"],
            ["5", "Elevenlabs", "TTS service provider", "https://elevenlabs.io/privacy-policy"],
            ["6", "Cartesia", "TTS service provider", "https://cartesia.ai/legal/privacy.html"],
            ["7", "Deepgram", "STT service provider", "https://deepgram.com/privacy"],
            ["8", "Sarvam", "STT service provider", "https://www.sarvam.ai/privacy-policy"],
            ["9", "Razorpay", "Payment gateway", "https://razorpay.com/privacy/"],
            ["10", "Slack", "Communication", "https://slack.com/intl/en-in/trust/privacy/privacy-policy"],
            ["11", "Google Workspace", "Email & file storage", "https://workspace.google.com/terms/education_privacy/"],
            ["12", "Twilio", "Telephony service provider", "https://www.twilio.com/en-us/legal/privacy"],
            ["13", "Plivo", "Telephony service provider", "https://www.plivo.com/legal/privacy/"],
            ["14", "Exotel", "Telephony service provider", "https://exotel.com/privacy-policy/"],
          ],
        },
        { type: "h3", text: "Use of your Personal Information" },
        {
          type: "p",
          text: "HoomanLabs collects and uses your personal information to operate and deliver the services you have requested. HoomanLabs may also use your personally identifiable information to inform you of other products or services available from HoomanLabs and its affiliates.",
        },
        { type: "h3", text: "Sharing Information with Third Parties" },
        {
          type: "p",
          text: "HoomanLabs does not sell, rent, or lease its customer lists to third parties. HoomanLabs may share data with trusted partners to help perform statistical analysis, send you email or postal mail, provide customer support, or arrange for deliveries. All such third parties are prohibited from using your personal information except to provide these services to HoomanLabs, and they are required to maintain the confidentiality of your information.",
        },
        {
          type: "p",
          text: "HoomanLabs may disclose your personal information, without notice, if required to do so by law or in the good faith belief that such action is necessary to: (a) conform to the edicts of the law or comply with legal process served on HoomanLabs or the site; (b) protect and defend the rights or property of HoomanLabs; and/or (c) act under exigent circumstances to protect the personal safety of users of HoomanLabs, or the public.",
        },
      ],
    },
    {
      title: "11. Disclaimers and Limitations of Liability",
      blocks: [
        {
          type: "list",
          items: [
            { term: "Scope of Liability", text: "We disclaim liability for unauthorized access to our servers or stored data resulting from causes beyond our reasonable control." },
            { term: "Service Providers", text: "We are not responsible for the privacy practices of third-party services, websites, or applications linked to or integrated with our Services." },
          ],
        },
      ],
    },
    {
      title: "12. Changes to This Privacy Policy",
      blocks: [
        {
          type: "p",
          text: "We may update this Policy at any time to reflect changes in our practices, technology, legal requirements, or other factors. Changes take effect upon posting to this page. Continued use of the Services indicates acceptance of the updated terms. We encourage you to review this Policy periodically.",
        },
      ],
    },
    {
      title: "13. Contact Us",
      blocks: [
        { type: "p", text: "If you have any questions, concerns, or requests regarding this Privacy Policy or our data handling practices, please contact us at:" },
        {
          type: "address",
          lines: [
            "Hall5 Technologies Private Limited",
            "HD-111, WeWork Salarpuria Magnifica, Tin Factory,",
            "78 Old Madras Road, Mahadevapura,",
            "Bangalore, Karnataka 560016",
            "Email: founders@hoomanlabs.com",
          ],
        },
        {
          type: "p",
          text: "By using the Application or our Services, you acknowledge that you have read and understood this Privacy Policy and agree to be bound by its terms.",
        },
      ],
    },
  ] satisfies PolicySection[],
}
