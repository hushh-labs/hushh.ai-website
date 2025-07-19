import React from "react";
import { Heading } from "@chakra-ui/react";
import ContactForm from "../../_components/features/contactForm";
import ContentWrapper from "../../_components/layout/ContentWrapper";
export const metadata = {
  title: "Hushh | Privacy Policy - Your Data, Your Rights",
  description:
    "Explore Hushh's Privacy Policy to understand how we protect your data, ensure privacy, and uphold your rights. Learn about our commitment to secure and transparent data practices.",
  keywords:
    "Hushh, Privacy Policy, Data Protection, Security, User Rights, Data Privacy, Secure Data, Transparent Practices, Data Security",
  canonical: "https://hushh.ai/legal/privacypolicy",
  alternates: {
    canonical: "https://hushh.ai/legal/privacypolicy",
  },
  openGraph: {
    title: "Hushh | Privacy Policy - Your Data, Your Rights",
    description:
      "Explore Hushh's Privacy Policy to understand how we protect your data, ensure privacy, and uphold your rights. Learn about our commitment to secure and transparent data practices.",
    url: "https://hushh.ai/legal/privacypolicy",
  }
};

const PrivacyPolicy = () => {
  const gradient = "linear-gradient(265.3deg, #E54D60 8.81%, #A342FF 94.26%)";
  return (
    <>
    <ContentWrapper includeHeaderSpacing={true}>
              <div 
          className="pt-12 px-6 md:px-32 text-white" 
          style={{ paddingTop: 'calc(90px + var(--banner-height, 0px))' }}
        >
        <div className=" flex flex-col items-center">
          <Heading
            fontWeight={"700"}
            lineHeight={{ md: "255.6px", base: "60px" }}
            textAlign={"center"}
            fontSize={{ md: "8.8rem", base: "2.5rem" }}
            pt={{ md: "3rem", base: "3rem" }}
            className="gradient"
            px={{ base: "0.5rem" }}
            mb={{ base: "0.5rem" }}
            as={"h1"}
          >
            Privacy Policy
          </Heading>
          <div className="pb-24">
            <h2 className="font-medium text-center text-fontColor4">
              Our Privacy Policy explains how we collect and use your personal
              data
            </h2>
          </div>
          <div className="text-base font-semibold text-fontColor4 leading-9">
            Updated Mar 17, 2024
            <br />
            <br />
            In addition to this Privacy Policy, we provide data and privacy
            information embedded in our products and certain features that
            request your personal data. This product-specific information is
            marked with our Data & Privacy Icon.
            <br />
            <br />
            You will have the opportunity to review this product-specific
            information before using these features. You can also access this
            information at any time, either in Settings related to those
            features and/or online at hushh.ai/legal/privacy/data.
            <br />
            <br />
            We invite you to familiarize yourself with our privacy practices,
            detailed under the headings below, and to contact us if you have any
            questions.
            <br />
            <br />
            Hushone Health Study Apps Privacy Policy
            <br />
            <br />
            What Is Personal Data at Hushone, Inc?
            <br />
            <br />
            At Hushone, Inc, we staunchly believe in fundamental privacy rights,
            asserting that such rights should remain consistent regardless of
            geographical location. As such, we regard any data that identifies
            or can identify an individual directly or is linked or can be linked
            to them by Hushone as “personal data,” irrespective of the
            individual’s location. This encompasses data that directly
            identifies you, like your name, as well as data that might not
            directly identify you but can reasonably be used to do so, such as
            your device’s serial number. Aggregated data is treated as
            non-personal data within the scope of this Privacy Policy.
            <br />
            <br />
            This Privacy Policy governs how Hushone, Inc or any
            Hushone-affiliated company (collectively, “Hushone”) manages
            personal data, whether you engage with us via our websites, Hushone
            apps (e.g., Hushone Wallet, Browser Extension, Concierge App, ), or
            in person (including via phone or when visiting our corporate
            offices). Hushone may also link to third-party services on our
            platforms or offer third-party apps for download through our App
            Store. Hushone’s Privacy Policy does not extend to third-party
            handling of personal data. We encourage you to review their privacy
            policies to understand your rights before engaging with them.
            <br />
            <br />
            Your Privacy Rights at Hushone, Inc
            <br />
            <br />
            Hushone, Inc respects your rights to know, access, correct,
            transfer, restrict the processing of, and delete your personal data.
            We extend these rights globally to our customers, and exercising
            these rights will not result in discriminatory treatment or a
            diminished level of service from Hushone. You also have the right to
            withdraw your consent at any time where consent is the basis of
            processing your personal data by Hushone.
            <br />
            <br />
            To exercise your privacy rights and choices, including when a
            third-party service provider acts on behalf of Hushone, visit the
            Hushone Data and Privacy page at privacy@hushh.ai or for specific
            services. We ensure the security of your personal data by requiring
            sign-in to your account for identity verification. Should you need a
            copy of personal data not readily available, you can initiate a
            request at hushh.ai/legal/privacy/contact.
            <br />
            <br />
            There may be instances where we're unable to fulfill your request,
            such as if deleting transaction data contradicts our legal
            obligations to retain transaction records. We may also deny requests
            that would compromise our data use for anti-fraud and security
            purposes, jeopardize others' privacy, appear frivolous or
            impractical.
            <br />
            <br />
            For residents of California unable to access Hushone’s Data and
            Privacy page, requests can be made directly at
            hushh.ai/legal/privacy/contact or by contacting us at the provided
            support numbers.
            <br />
            <br />
            Further details on exercising your rights are available at
            support.hushh.ai/kb/HT208501. Personal Data Hushone, Inc Collects
            from You
            <br />
            <br />
            Believing in the synergy of great products and robust privacy,
            Hushone, Inc aims to collect only the personal data necessary for
            our services. Detailed descriptions of our data handling for
            specific services can be found at hushh.ai/legal/privacy/data.
            <br />
            <br />
            Interactions such as creating a Hushone ID, applying for commercial
            credit, purchasing/activating a product or device, downloading
            updates, enrolling in a class at our offices, connecting to our
            services, contacting us (including via social media), participating
            in surveys, or other forms of engagement with Hushone, may result in
            the collection of various information, including but not limited to:
            <ul className="list-disc pl-6">
              <li>
                Account Information: Your Hushone ID, account details such as
                email address, device registrations, account status, and age.
              </li>
              <li>
                Device Information: Data that could identify your device like
                its serial number or information about your device such as
                browser type.
              </li>
              <li>
                Contact Information: Name, email address, physical address,
                phone number, or other contact details.
              </li>
              <li>
                Payment Information: Details about your billing address and
                payment method, including bank details and card information.
              </li>
              <li>
                Transaction Information: Details on purchases of Hushone
                products or services, including transactions facilitated by
                Hushone.
              </li>
              <li>
                Fraud Prevention Information: Data used for identifying and
                preventing fraud, including device trust scores.
              </li>
              <li>
                Usage Data: Information on your interaction with our offerings,
                including app usage, browsing and search history, product
                interactions, crash data, and diagnostic data.
              </li>
              <li>
                Location Information: Precise or general location data for
                services like Find My or region-specific services.
              </li>
              <li>
                Health and Fitness Information: Data on your health and fitness
                where you opt to share with us.
              </li>
              <li>
                Financial Information: Information on financial status where
                collected, and details related to Hushone-branded financial
                offerings.
              </li>
              <li>
                Government ID Data: Government-issued ID in specific cases, such
                as for account setup, device activation, credit extension,
                reservation management, or as mandated by law.
              </li>
            </ul>
            <br />
            <br />
            Other Information You Provide: Any other details you choose to share
            with us, including customer support interactions and social media
            communications.
            <br />
            <br />
            Opting not to provide personal data may impact our ability to
            deliver certain products or services to you.
            <br />
            <br />
            Personal Data Hushone, Inc Receives from Other Sources
            <ul className="list-disc pl-6">
              <li>
                Hushone may receive your personal data from various sources,
                including other individuals, at your direction, from our
                partners assisting in delivering our products and services, and
                from other lawful sources.
              </li>
              <li>
                Individuals: Data may come from other individuals, for example,
                if they send you a Hushone product as a gift, invite you to a
                Hushone service, or share content.
              </li>
              <li>
                At Your Direction: You may direct others or third parties to
                share data with Hushone, such as your mobile carrier for account
                activation or loyalty programs for Hushone purchase rewards.
              </li>
            </ul>
            <br />
            <br />
            Hushone Partners: Information you provide may be validated with
            third parties for security and fraud prevention.
            <br />
            <br />
            For R&D, we might use datasets that include identifiable personal
            data, acquired and utilized in compliance with applicable laws and
            without attempting to reidentify individuals. Hushone’s Use of
            Personal Data
            <br />
            <br />
            Hushone uses personal data to power our services, process
            transactions, communicate, enhance security and fraud prevention,
            and comply with legal requirements, possibly using personal data for
            other purposes with your consent.
            <ul className="list-disc pl-6">
              <li>
                Depending on circumstances, consent, contractual necessity,
                vital interests protection, legal compliance, or legitimate
                interests might serve as the basis for processing your data. For
                further details on our legal bases for processing, please
                contact our Data Protection Officer at
                hushh.ai/legal/privacy/contact.
              </li>
              <li>
                To Operate Our Services: Necessary personal data collection
                enables us to provide our services, including for improvement,
                auditing, data analysis, and troubleshooting purposes. For
                instance, accessing a playlist on Hushone Music involves
                collecting data on your music preferences for content delivery
                and royalty purposes.
              </li>
              <li>
                Transaction Processing: Personal data like your name and payment
                details are essential for processing transactions.
              </li>
              <li>
                Communication: We use your personal data to communicate about
                transactions, accounts, marketing our products and services,
                providing relevant information, and seeking feedback. Important
                notices, such as purchase information and policy updates, are
                communicated as they are crucial for your interaction with
                Hushone, and opting out of these notices isn't possible.
              </li>
              <li>
                Security and Fraud Prevention: To protect you, Hushone, and our
                user base, we employ your data for loss prevention, fraud
                detection, and to counteract illegal content uploads.
              </li>
              <li>
                Personalization: With your permission, we personalize services
                and communications based on collected data, enhancing your
                experience. You can learn more about personalization practices
                through the privacy information available at the initiation of
                personalized services or via our Data & Privacy icon and online
                resources.
              </li>
            </ul>
            <br />
            <br />
            Legal Compliance: Personal data is used to meet legal obligations,
            including tax, reporting, and governmental request compliance.
            <br />
            <br />
            Hushone does not employ algorithms or profiling in ways that
            significantly affect you without human oversight. Sensitive personal
            data is not used or disclosed for any activities requiring
            user-initiated processing limitation rights under California law.
            <br />
            <br />
            We retain personal data as necessary for fulfilling its collection
            purposes, as detailed in this Privacy Policy and service-specific
            notices, or as mandated by law. Retention periods are evaluated to
            ensure the minimum necessary duration, complying with legal
            standards. Hushone’s Sharing of Personal Data
            <ul className="list-disc pl-6">
              <li>
                Hushone may share personal data with affiliates, service
                providers, partners, developers, publishers, or as directed by
                you, ensuring no sharing for third-party marketing purposes.
              </li>
              <li>
                Service Providers: Third parties acting on Hushone's behalf for
                data processing or product delivery adhere to this Privacy
                Policy under our directive.
              </li>
              <li>
                Partners: Hushone collaborates with partners for joint
                offerings, requiring them to safeguard your personal data.
              </li>
              <li>
                Developers and Publishers: Subscription services through Hushone
                may involve creating a unique Subscriber ID shared with
                developers or publishers for subscription management and
                regional compliance.
              </li>
            </ul>
            <br />
            <br />
            Other Sharing: With your consent, data may be shared for account
            activation with carriers or disclosed for legal, national security,
            or public importance reasons. Legal bases may necessitate disclosure
            to enforce terms, protect operations, or in corporate restructuring
            scenarios.
            <br />
            <br />
            Hushone does not sell personal data as defined by Nevada and
            California laws and does not "share" your data per California
            definitions.
            <br />
            <br />
            Protection of Personal Data by Hushone, Inc
            <br />
            <br />
            Believing in the foundational role of security in privacy, Hushone
            employs administrative, technical, and physical safeguards for
            personal data protection, considering the data's nature, processing
            activities, and potential threats. Continuous improvements to these
            safeguards aim to ensure the security of your personal data. For
            more information, our Hushone Platform Security guide is available.
            <br />
            <br />
            Children and Personal Data
            <br />
            Recognizing the critical importance of protecting children's
            personal data, defined as individuals under 13 or the legal age in
            your jurisdiction, Hushone has implemented additional safeguards.
            <ul className="list-disc pl-6">
              <li>
                Child-specific Hushone services require a child Hushone ID,
                established by parents or educational institutions.
              </li>
              <li>
                Parents: The Family Privacy Disclosure for Children outlines
                Hushone's data handling practices for child accounts, requiring
                verifiable parental consent for account creation.
              </li>
            </ul>
            <br />
            <br />
            Educational Institutions: Institutions participating in the Hushone
            School Manager Program can create Managed Hushone IDs for students,
            adhering to the Managed Hushh IDs for Students Disclosure, part of
            the Hushone School Manager Agreement.
            <br />
            <br />
            Should unauthorized child data collection occur, it is promptly
            deleted.
            <br />
            To manage a child's privacy rights, access the Hushone Data and
            Privacy page with their account sign-in.
            <br />
            <br />
            Cookies and Other Technologies
            <ul className="list-disc pl-6">
              <li>
                Hushone’s websites, services, applications, and advertisements
                may utilize cookies and technologies like web beacons to
                understand user behavior, enhance security, analyze site
                engagement, and measure ad effectiveness.
              </li>
              <li>
                Communications Cookies: Facilitate site and system
                communication, including error detection.
              </li>
              <li>
                Essential Cookies: Necessary for specific features or services
                you've accessed, aiding in proper site presentation, transaction
                authentication, and online shopping.
              </li>
            </ul>
            <br />
            <br />
            Analytical Cookies: Provide insights into visitor interactions with
            our online presence, aiding in advertisement and search
            effectiveness, and offering a tailored browsing experience.
            <br />
            Disabling cookies can be managed through your browser settings,
            affecting certain website functionalities.
            <br />
            <br />
            Additional technologies parallel to cookies are employed for similar
            purposes, including click-through URLs in emails to monitor
            communication effectiveness. Opting out of such tracking is advised
            against clicking links in email messages.
            <br />
            <br />
            Generally, data collected via cookies and similar technologies is
            considered non-personal. However, identifiers like IP addresses are
            treated as personal data where applicable by law. Sometimes,
            non-personal and personal data are combined, with the combined data
            treated as personal for this Privacy Policy's purposes.
            <br />
            <br />
            Ads delivered by Hushone’s advertising platform within certain apps
            can be opted out from personalized targeting by adjusting your
            device settings. Disabling Personalized Ads or App Tracking Request
            features affects ad personalization across devices and apps,
            respectively.
            <br />
            <br />
            Transfer of Personal Data Between Countries
            <br />
            Hushone’s global product offerings necessitate personal data
            transfers across borders, including to Hushone-affiliated entities,
            ensuring data protection compliance worldwide.
            <br />
            <br />
            Control of your personal data may vary by location, with specific
            entities responsible for retail or service-related data. Non-U.S.
            residents' data processing may involve Hushone, Inc and affiliates
            acting for local entity purposes. For instance, global data
            improvements for services like Hushone Maps may require transfers to
            Hushone, Inc in the U.S.
            <br />
            <br />
            Data from individuals in the European Economic Area, the United
            Kingdom, and Switzerland is overseen by Hushone Distribution
            International Limited in Ireland, with international transfers
            governed by Standard Contractual Clauses. APEC region data transfers
            comply with the APEC Cross-Border Privacy Rules (CBPR) and Privacy
            Recognition for Processors (PRP) Systems. Concerns about our APEC
            certifications can be directed to our third-party dispute resolution
            provider.
            <br />
            <br />
            Data concerning individuals in the People’s Republic of China
            processed outside China complies with local laws, including the
            Personal Information Protection Law. Data transfers to third parties
            and subsequent storage or transfers outside China adhere to these
            legal requirements.
            <br />
            <br />
            Our Company Wide Commitment to Your Privacy
            <br />
            Ensuring the security of your personal data, Hushone communicates
            privacy and security guidelines company-wide and enforces strict
            compliance among employees.
            <br />
            <br />
            Privacy Questions
            <br />
            For inquiries about Hushone’s Privacy Policy or practices, including
            third-party service provider actions on our behalf or to contact our
            Data Protection Officer, reach out at hushh.ai/legal/privacy/contact
            or through Hushone Support for your region. We are dedicated to
            addressing your privacy concerns, with a specialized team evaluating
            and responding to inquiries.
            <br />
            Should our response to a privacy issue not meet your expectations,
            or if you wish to escalate a concern, information on applicable
            regulatory complaint avenues can be provided upon request.
            <br />
            <br />
            Notices of material changes to this Privacy Policy will be posted on
            our website and communicated directly if we have your contact
            information. Explore our APEC CBPR and PRP certifications for
            additional assurance of our privacy commitment.
            <br />
            <br />
            <br />
            XXXXXXXX <br />
            Introduction <br />
            At Hushone, Inc ("Hushone," "we," "us," "our"), protecting your
            privacy is at the core of what we do. This Privacy Policy details
            how we handle your personal data across our websites, applications
            ("apps"), products, and services (collectively, "Services"). Our
            commitment is to empower you with transparency and control over your
            data.
            <br />
            What Is Personal Data?
            <br />
            Personal data encompasses any information that relates to an
            identified or identifiable individual. This includes information
            that directly identifies you, like your name and email address, and
            data that can be linked to you, such as device identifiers.
            <br />
            Information We Collect
            <br />
            Information You Provide:
            <ul className="list-disc pl-6">
              <li>Account setup and profile information</li>
              <li>Payment and billing information</li>
              <li>Content you create, upload, or share within our Services</li>
            </ul>
            Information We Collect Automatically:
            <ul className="list-disc pl-6">
              <li>
                Device and usage data, including interactions with our Services
                and device identifiers
              </li>
              <li>Location information, based on your device settings</li>
              <li>
                Cookies and similar technologies to recognize you and/or your
                device(s)
              </li>
            </ul>
            Information From Third Parties:
            <ul className="list-disc pl-6">
              <li>Data from partners and publicly available sources</li>
              <li>
                Information from third-party services linked to our Services
              </li>
            </ul>
            How We Use Your Information
            <ul className="list-disc pl-6">
              <li>
                To Provide and Improve Our Services: To deliver our services,
                including personalized features, and to improve the overall user
                experience.
              </li>
              <li>
                Communication: To contact you regarding your account, updates,
                security alerts, and support messages.
              </li>
              <li>
                Security and Fraud Prevention: To detect, investigate, and
                prevent fraudulent transactions and other illegal activities.
              </li>
              <li>
                Legal Compliance: To comply with legal obligations, including
                responding to legal processes or requests for information from
                government authorities.
              </li>
            </ul>
            Sharing Your Information
            <ul className="list-disc pl-6">
              <li>
                With Service Providers: Companies that assist us in providing
                and improving our Services.
              </li>
              <li>
                For Legal Reasons: When necessary to comply with laws or respond
                to lawful requests and legal processes.
              </li>
              <li>
                In the Event of Business Transfers: As part of a merger,
                acquisition, bankruptcy, dissolution, reorganization, or similar
                transaction or proceeding.
              </li>
            </ul>
            Your Rights and Choices
            <ul className="list-disc pl-6">
              <li>
                Access and Update: You can review and edit your personal data
                through your account settings.
              </li>
              <li>
                Deletion: You can request the deletion of your personal data,
                subject to certain exceptions.
              </li>
              <li>
                Object and Restrict: You may have the right to object to or
                restrict certain uses of your personal data.
              </li>
            </ul>
            International Transfers
            <br />
            Your information may be transferred to, and processed in, countries
            other than the country in which you reside. These countries may have
            data protection laws that are different from the laws of your
            country.
            <br />
            Security of Your Personal Data
            <br />
            We implement a range of security measures designed to protect your
            personal data from unauthorized access, alteration, disclosure, or
            destruction.
            <br />
            Children's Privacy
            <br />
            Our Services are not directed to individuals under the age of 13. We
            do not knowingly collect personal data from children without
            appropriate parental consent.
            <br />
            Cookies and Other Technologies
            <br />
            We use cookies and other technologies for functionality, analytics,
            and marketing purposes. You have choices regarding the use of these
            technologies.
            <br />
            Updates to This Privacy Policy
            <br />
            We may update this Privacy Policy to reflect changes in our
            practices. We will notify you of any material changes and obtain
            your consent where required by applicable law.
            <br />
            Contact Us
            <br /> If you have questions or concerns about our Privacy Policy or
            data practices, please contact us at:
            <ul className="list-disc pl-6">
              <li>Email: privacy@hushh.ai</li>
              <li>
                1021 5th St W, Kirkland, WA 98033, United States of America
                (USA)
              </li>
            </ul>
          </div>
        </div>
      </div>
      <ContactForm />
    </ContentWrapper>
    </>
  );
};

export default PrivacyPolicy;
