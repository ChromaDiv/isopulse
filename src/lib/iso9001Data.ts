// ============================================================
// IsoPulse — Master ISO 9001:2015 Clause Database
// Authoritative definitions and pre-built checklist questions
// ============================================================

export interface SubClauseDefinition {
  id: string; // e.g. "4.1"
  title: string;
  definition: string;
  fullRequirements: string; // Verbatim text from standard
  auditQuestions: string[];
  departments: string[];
}

export interface MainClauseDefinition {
  id: string; // e.g. "4"
  title: string;
  subclauses: Record<string, SubClauseDefinition>;
}

export interface GeneralSectionDefinition {
  id: string;
  title: string;
  content: string;
}

export const ISO_9001_GENERAL_SECTIONS: Record<string, GeneralSectionDefinition> = {
  '0': {
    id: '0',
    title: 'Introduction',
    content: `### 0.1 General
The adoption of a quality management system is a strategic decision for an organization that can help to improve its overall performance and provide a sound basis for sustainable development initiatives.
The potential benefits to an organization of implementing a quality management system based on this International Standard are:
a) the ability to consistently provide products and services that meet customer and applicable statutory and regulatory requirements;
b) facilitating opportunities to enhance customer satisfaction;
c) addressing risks and opportunities associated with its context and objectives;
d) the ability to demonstrate conformity to specified quality management system requirements.
This International Standard employs the process approach, which incorporates the Plan-Do-Check-Act (PDCA) cycle and risk-based thinking.

### 0.2 Quality management principles
This International Standard is based on the quality management principles described in ISO 9000:
- customer focus
- leadership
- engagement of people
- process approach
- improvement
- evidence-based decision making
- relationship management

### 0.3 Process approach
Understanding and managing interrelated processes as a system contributes to the organization's effectiveness and efficiency in achieving its intended results. This approach enables the organization to control the interrelationships and interdependencies among the processes of the system.

### 0.4 Relationship with other management system standards
This International Standard applies the framework developed by ISO to improve alignment among its International Standards for management systems.`
  },
  '1': {
    id: '1',
    title: 'Scope',
    content: `This International Standard specifies requirements for a quality management system when an organization:
a) needs to demonstrate its ability to consistently provide products and services that meet customer and applicable statutory and regulatory requirements, and
b) aims to enhance customer satisfaction through the effective application of the system, including processes for improvement of the system and the assurance of conformity to customer and applicable statutory and regulatory requirements.
All the requirements of this International Standard are generic and are intended to be applicable to any organization, regardless of its type or size, or the products and services it provides.`
  },
  '2': {
    id: '2',
    title: 'Normative references',
    content: `The following documents, in whole or in part, are normatively referenced in this document and are indispensable for its application.
- ISO 9000:2015, Quality management systems — Fundamentals and vocabulary`
  },
  '3': {
    id: '3',
    title: 'Terms and definitions',
    content: `For the purposes of this document, the terms and definitions given in ISO 9000:2015 apply.`
  }
};

export const ISO_9001_2015_MASTER: Record<string, MainClauseDefinition> = {
  '4': {
    id: '4',
    title: 'Context of the Organization',
    subclauses: {
      '4.1': {
        id: '4.1',
        title: 'Understanding the organization and its context',
        definition: 'Determine external and internal issues that are relevant to the organization\'s purpose and strategic direction, and that affect its ability to achieve QMS outcomes.',
        fullRequirements: `The organization shall determine external and internal issues that are relevant to its purpose and its strategic direction and that affect its ability to achieve the intended result(s) of its quality management system.
The organization shall monitor and review information about these external and internal issues.
NOTE 1: Issues can include positive and negative factors or conditions for consideration.
NOTE 2: Understanding the external context can be facilitated by considering issues arising from legal, technological, competitive, market, cultural, social and economic environments, whether international, national, regional or local.
NOTE 3: Understanding the internal context can be facilitated by considering issues related to values, culture, knowledge and performance of the organization.`,
        auditQuestions: [
          'Has top management identified relevant internal and external issues (strategic direction, culture, market, regulatory, etc.)?',
          'Is there a formal process (e.g. SWOT analysis, PESTLE) to monitor and review these issues periodically?',
          'How does the organization ensure context issues are integrated into QMS risk planning?'
        ],
        departments: ['Quality Assurance', 'Sales', 'Engineering']
      },
      '4.2': {
        id: '4.2',
        title: 'Understanding the needs and expectations of interested parties',
        definition: 'Determine the interested parties (customers, regulatory bodies, suppliers, partners) that are relevant to the QMS, and their requirements.',
        fullRequirements: `Due to their effect or potential effect on the organization's ability to consistently provide products and services that meet customer and applicable statutory and regulatory requirements, the organization shall determine:
a) the interested parties that are relevant to the quality management system;
b) the requirements of these interested parties that are relevant to the quality management system.
The organization shall monitor and review information about these interested parties and their relevant requirements.`,
        auditQuestions: [
          'Who are the identified interested parties relevant to the Quality Management System?',
          'What are the requirements (contractual, legal, operational) of these interested parties?',
          'Is there evidence of periodic monitoring and review of this interested party information?'
        ],
        departments: ['Procurement', 'Sales', 'Quality Assurance']
      },
      '4.3': {
        id: '4.3',
        title: 'Determining the scope of the QMS',
        definition: 'Determine the boundaries and applicability of the QMS to establish its scope, considering context, interested party needs, and products/services.',
        fullRequirements: `The organization shall determine the boundaries and applicability of the quality management system to establish its scope.
When determining this scope, the organization shall consider:
a) the external and internal issues referred to in 4.1;
b) the requirements of relevant interested parties referred to in 4.2;
c) the products and services of the organization.
The organization shall apply all the requirements of this International Standard if they are applicable within the determined scope of its quality management system.
The scope of the organization's quality management system shall be available and be maintained as documented information. The scope shall state the types of products and services covered, and provide justification for any requirement of this International Standard that the organization determines is not applicable to the scope of its quality management system.
Conformity to this International Standard may only be claimed if the requirements determined as not being applicable do not affect the organization's ability or responsibility to ensure the conformity of its products and services and the enhancement of customer satisfaction.`,
        auditQuestions: [
          'Is the scope of the QMS available as documented information?',
          'Does the scope specify the products and services covered, and justify any standard exclusions?',
          'Was the scope defined considering external/internal issues and interested party requirements?'
        ],
        departments: ['Quality Assurance']
      },
      '4.4': {
        id: '4.4',
        title: 'Quality management system and its processes',
        definition: 'Establish, implement, maintain, and continually improve the QMS, including the processes needed and their interactions.',
        fullRequirements: `4.4.1 The organization shall establish, implement, maintain and continually improve a quality management system, including the processes needed and their interactions, in accordance with the requirements of this International Standard.
The organization shall determine the processes needed for the quality management system and their application throughout the organization, and shall:
a) determine the inputs required and the outputs expected from these processes;
b) determine the sequence and interaction of these processes;
c) determine and apply the criteria and methods (including monitoring, measurements and related performance indicators) needed to ensure the effective operation and control of these processes;
d) determine the resources needed for these processes and ensure their availability;
e) assign the responsibilities and authorities for these processes;
f) address the risks and opportunities as determined in accordance with the requirements of 6.1;
g) evaluate these processes and implement any changes needed to ensure that these processes achieve their intended results;
h) improve the processes and the quality management system.
4.4.2 To the extent necessary, the organization shall:
a) maintain documented information to support the operation of its processes;
b) retain documented information to have confidence that the processes are being carried out as planned.`,
        auditQuestions: [
          'Are QMS processes identified, mapped, and measured (inputs, outputs, sequence, indicators)?',
          'Who are the assigned process owners, and what are their responsibilities?',
          'Are there documented procedures or flowcharts showing how processes interact?'
        ],
        departments: ['Quality Assurance', 'Production', 'Logistics', 'Engineering']
      }
    }
  },
  '5': {
    id: '5',
    title: 'Leadership',
    subclauses: {
      '5.1': {
        id: '5.1',
        title: 'Leadership and commitment',
        definition: 'Top management must demonstrate leadership and commitment by taking accountability for QMS effectiveness, establishing the Quality Policy, and promoting improvement.',
        fullRequirements: `5.1.1 General
Top management shall demonstrate leadership and commitment with respect to the quality management system by:
a) taking accountability for the effectiveness of the quality management system;
b) ensuring that the quality policy and quality objectives are established for the quality management system and are compatible with the context and strategic direction of the organization;
c) ensuring the integration of the quality management system requirements into the organization's business processes;
d) promoting the use of the process approach and risk-based thinking;
e) ensuring that the resources needed for the quality management system are available;
f) communicating the importance of effective quality management and of conforming to the quality management system requirements;
g) ensuring that the quality management system achieves its intended results;
h) engaging, directing and supporting persons to contribute to the effectiveness of the quality management system;
i) promoting improvement;
j) supporting other relevant management roles to demonstrate their leadership as it applies to their areas of responsibility.
5.1.2 Customer focus
Top management shall demonstrate leadership and commitment with respect to customer focus by ensuring that:
a) customer and applicable statutory and regulatory requirements are determined, understood and consistently met;
b) the risks and opportunities that can affect conformity of products and services and the ability to enhance customer satisfaction are determined and addressed;
c) the focus on enhancing customer satisfaction is maintained.`,
        auditQuestions: [
          'How does top management demonstrate accountability for the effectiveness of the QMS?',
          'Are the quality policy and objectives aligned with the strategic direction of the organization?',
          'Is there evidence that top management promotes continual improvement and supports process owners?'
        ],
        departments: ['Quality Assurance', 'Sales']
      },
      '5.2': {
        id: '5.2',
        title: 'Quality Policy',
        definition: 'Establish, implement, and maintain a quality policy appropriate to the context and purpose of the organization.',
        fullRequirements: `5.2.1 Establishing the quality policy
Top management shall establish, implement and maintain a quality policy that:
a) is appropriate to the purpose and context of the organization and supports its strategic direction;
b) provides a framework for setting quality objectives;
c) includes a commitment to satisfy applicable requirements;
d) includes a commitment to continual improvement of the quality management system.
5.2.2 Communicating the quality policy
The quality policy shall:
a) be available and be maintained as documented information;
b) be communicated, understood and applied within the organization;
c) be available to relevant interested parties, as appropriate.`,
        auditQuestions: [
          'Is the Quality Policy documented, approved, and aligned with organizational objectives?',
          'How is the Quality Policy communicated to employees and made available to relevant interested parties?',
          'Do employees understand what the Quality Policy means to their daily operations?'
        ],
        departments: ['Quality Assurance', 'Human Resources']
      },
      '5.3': {
        id: '5.3',
        title: 'Organizational roles, responsibilities and authorities',
        definition: 'Ensure that responsibilities and authorities for relevant roles are assigned, communicated, and understood.',
        fullRequirements: `Top management shall ensure that the responsibilities and authorities for relevant roles are assigned, communicated and understood within the organization.
Top management shall assign the responsibility and authority for:
a) ensuring that the quality management system conforms to the requirements of this International Standard;
b) ensuring that the processes are delivering their intended outputs;
c) reporting on the performance of the quality management system and on opportunities for improvement (see 10.1), in particular to top management;
d) ensuring the promotion of customer focus throughout the organization;
e) ensuring that the integrity of the quality management system is maintained when changes to the quality management system are planned and implemented.`,
        auditQuestions: [
          'Are job descriptions, organizational charts, or responsibility matrices documented and communicated?',
          'Who is responsible for ensuring the QMS conforms to ISO 9001 and reporting on its performance?',
          'Are responsibilities for maintaining integrity during QMS changes clearly assigned?'
        ],
        departments: ['Human Resources', 'Quality Assurance']
      }
    }
  },
  '6': {
    id: '6',
    title: 'Planning',
    subclauses: {
      '6.1': {
        id: '6.1',
        title: 'Actions to address risks and opportunities',
        definition: 'Determine risks and opportunities that need to be addressed to assure the QMS can achieve its outcomes.',
        fullRequirements: `6.1.1 When planning for the quality management system, the organization shall consider the issues referred to in 4.1 and the requirements referred to in 4.2 and determine the risks and opportunities that need to be addressed to:
a) give assurance that the quality management system can achieve its intended result(s);
b) enhance desirable effects;
c) prevent, or reduce, undesired effects;
d) achieve improvement.
6.1.2 The organization shall plan:
a) actions to address these risks and opportunities;
b) how to:
1) integrate and implement the actions into its quality management system processes (see 4.4);
2) evaluate the effectiveness of these actions.
Actions taken to address risks and opportunities shall be proportionate to the potential impact on the conformity of products and services.`,
        auditQuestions: [
          'How are risks and opportunities identified, evaluated, and updated in the Risk Register?',
          'Are mitigation plans defined with assigned owners, and is their effectiveness evaluated?',
          'Is there a direct link between identified operational risks and the QMS objectives?'
        ],
        departments: ['Quality Assurance', 'Engineering', 'Production']
      },
      '6.2': {
        id: '6.2',
        title: 'Quality objectives and planning to achieve them',
        definition: 'Establish quality objectives at relevant functions, levels, and processes that are measurable, consistent with policy, and monitored.',
        fullRequirements: `6.2.1 The organization shall establish quality objectives at relevant functions, levels and processes needed for the quality management system.
The quality objectives shall:
a) be consistent with the quality policy;
b) be measurable;
c) take into account applicable requirements;
d) be relevant to conformity of products and services and to enhancement of customer satisfaction;
e) be monitored;
f) be communicated;
g) be updated as appropriate.
The organization shall maintain documented information on the quality objectives.
6.2.2 When planning how to achieve its quality objectives, the organization shall determine:
a) what will be done;
b) what resources will be required;
c) who will be responsible;
d) when it will be completed;
e) how the results will be evaluated.`,
        auditQuestions: [
          'Are Quality Objectives established, measurable, monitored, and communicated?',
          'Is there a plan defining what will be done, what resources are required, who is responsible, and how results are evaluated?',
          'Are objectives updated as needed to reflect changes in QMS requirements?'
        ],
        departments: ['Quality Assurance', 'Production', 'Sales']
      },
      '6.3': {
        id: '6.3',
        title: 'Planning of changes',
        definition: 'Carry out QMS changes in a planned and systematic manner.',
        fullRequirements: `When the organization determines the need for changes to the quality management system, the changes shall be carried out in a planned manner (see 4.4).
The organization shall consider:
a) the purpose of the changes and their potential consequences;
b) the integrity of the quality management system;
c) the availability of resources;
d) the allocation or reallocation of responsibilities and authorities.`,
        auditQuestions: [
          'Is there a documented process for managing changes to the QMS?',
          'Does the organization evaluate the integrity of the QMS prior to executing system changes?',
          'Are responsibilities and resource availability verified before QMS modifications?'
        ],
        departments: ['Quality Assurance', 'Engineering']
      }
    }
  },
  '7': {
    id: '7',
    title: 'Support',
    subclauses: {
      '7.1': {
        id: '7.1',
        title: 'Resources',
        definition: 'Determine and provide resources needed for QMS establishment, implementation, maintenance, and improvement.',
        fullRequirements: `7.1.1 General
The organization shall determine and provide the resources needed for the establishment, implementation, maintenance and continual improvement of the quality management system.
The organization shall consider:
a) the capabilities of, and constraints on, existing internal resources;
b) what needs to be obtained from external providers.
7.1.2 People
The organization shall determine and provide the persons necessary for the effective implementation of its quality management system and for the operation and control of its processes.
7.1.3 Infrastructure
The organization shall determine, provide and maintain the infrastructure necessary for the operation of its processes and to achieve conformity of products and services.
7.1.4 Environment for the operation of processes
The organization shall determine, provide and maintain the environment necessary for the operation of its processes and to achieve conformity of products and services.
NOTE: A suitable environment can be a combination of human and physical factors, such as social, psychological, and physical.
7.1.5 Monitoring and measuring resources
7.1.5.1 General
The organization shall determine and provide the resources needed to ensure valid and reliable results when monitoring or measuring is used to verify the conformity of products and services to requirements.
The organization shall ensure that the resources provided:
a) are suitable for the specific type of monitoring and measurement activities being undertaken;
b) are maintained to ensure their continuing fitness for their purpose.
The organization shall retain appropriate documented information as evidence of fitness for purpose of the monitoring and measurement resources.
7.1.5.2 Measurement traceability
When measurement traceability is a requirement, or is considered by the organization to be an essential part of providing confidence in the validity of measurement results, measuring equipment shall be:
a) calibrated or verified, or both, at specified intervals, or prior to use, against measurement standards traceable to international or national measurement standards;
b) identified in order to determine their status;
c) safeguarded from adjustments, damage or deterioration that would invalidate the calibration status and subsequent measurement results.
7.1.6 Organizational knowledge
The organization shall determine the knowledge necessary for the operation of its processes and to achieve conformity of products and services. This knowledge shall be maintained and be made available to the extent necessary.`,
        auditQuestions: [
          'Are infrastructure resources (buildings, equipment, software) maintained in a state that ensures product compliance?',
          'Is the process environment (temperature, humidity, safety, ergonomics) monitored and controlled?',
          'Are monitoring/measuring devices calibrated, tracked, and verified against international standards?'
        ],
        departments: ['Procurement', 'Logistics', 'Production', 'Engineering']
      },
      '7.2': {
        id: '7.2',
        title: 'Competence',
        definition: 'Determine the necessary competence of person(s) doing work under QMS control and ensure they are competent on the basis of education, training, or experience.',
        fullRequirements: `The organization shall:
a) determine the necessary competence of person(s) doing work under its control that affects the performance and effectiveness of the quality management system;
b) ensure that these persons are competent on the basis of appropriate education, training, or experience;
c) where applicable, take actions to acquire the necessary competence, and evaluate the effectiveness of the actions taken;
d) retain appropriate documented information as evidence of competence.`,
        auditQuestions: [
          'Are training records, certifications, and educational credentials of staff documented and available?',
          'Is there a process to identify training gaps and evaluate the effectiveness of completed training?',
          'Are process operators verified as competent before performing tasks affecting product quality?'
        ],
        departments: ['Human Resources', 'Quality Assurance', 'Production']
      },
      '7.3': {
        id: '7.3',
        title: 'Awareness',
        definition: 'Ensure persons doing work under organization control are aware of policy, objectives, contribution to effectiveness, and implications of non-conformance.',
        fullRequirements: `The organization shall ensure that persons doing work under the organization's control are aware of:
a) the quality policy;
b) relevant quality objectives;
c) their contribution to the effectiveness of the quality management system, including the benefits of improved performance;
d) the implications of not conforming with the quality management system requirements.`,
        auditQuestions: [
          'Are employees aware of the quality policy and specific objectives for their departments?',
          'Do workers understand how their actions affect quality outputs and customer satisfaction?',
          'Are the implications of not conforming to QMS requirements communicated and understood?'
        ],
        departments: ['Human Resources', 'Quality Assurance']
      },
      '7.4': {
        id: '7.4',
        title: 'Communication',
        definition: 'Determine internal and external communications relevant to the QMS.',
        fullRequirements: `The organization shall determine the internal and external communications relevant to the quality management system, including:
a) on what it will communicate;
b) when to communicate;
c) with whom to communicate;
d) how to communicate;
e) who communicates.`,
        auditQuestions: [
          'Is there a communication plan specifying what, when, with whom, and how to communicate QMS status?',
          'Are customer complaints, feedback, and regulatory issues communicated internally to relevant teams?',
          'How does the organization verify that communications are executed effectively?'
        ],
        departments: ['Quality Assurance', 'Sales']
      },
      '7.5': {
        id: '7.5',
        title: 'Documented information',
        definition: 'Ensure QMS includes documented information required by standard and determined as necessary by organization.',
        fullRequirements: `7.5.1 General
The organization's quality management system shall include:
a) documented information required by this International Standard;
b) documented information determined by the organization as being necessary for the effectiveness of the quality management system.
7.5.2 Creating and updating
When creating and updating documented information, the organization shall ensure appropriate:
a) identification and description (e.g. a title, date, author, or reference number);
b) format (e.g. language, software version, graphics) and media (e.g. paper, electronic);
c) review and approval for suitability and adequacy.
7.5.3 Control of documented information
7.5.3.1 Documented information required by the quality management system and by this International Standard shall be controlled to ensure:
a) it is available and suitable for use, where and when it is needed;
b) it is adequately protected (e.g. from loss of confidentiality, improper use, or loss of integrity).
7.5.3.2 For the control of documented information, the organization shall address the following activities, as applicable:
a) distribution, access, retrieval and use;
b) storage and preservation, including preservation of legibility;
c) control of changes (e.g. version control);
d) retention and disposition.`,
        auditQuestions: [
          'Are documents indexed, approved, and restricted to current revisions at points of use?',
          'Is there a defined retention, archiving, and retrieval process for quality records?',
          'How is documented information of external origin identified and controlled?'
        ],
        departments: ['Quality Assurance', 'Engineering']
      }
    }
  },
  '8': {
    id: '8',
    title: 'Operation',
    subclauses: {
      '8.1': {
        id: '8.1',
        title: 'Operational planning and control',
        definition: 'Plan, implement, and control the processes needed to meet requirements for products and services.',
        fullRequirements: `The organization shall plan, implement and control the processes (see 4.4) needed to meet the requirements for the provision of products and services, and to implement the actions determined in Clause 6, by:
a) determining the requirements for the products and services;
b) establishing criteria for:
1) the processes;
2) the acceptance of products and services;
c) determining the resources needed to achieve conformity to the product and service requirements;
d) implementing control of the processes in accordance with the criteria;
e) determining, maintaining and retaining documented information to the extent necessary:
1) to have confidence that the processes have been carried out as planned;
2) to demonstrate the conformity of products and services to their requirements.
The output of this planning shall be suitable for the organization's operations.
The organization shall control planned changes and review the consequences of unintended changes, taking action to mitigate any adverse effects, as necessary.
The organization shall ensure that outsourced processes are controlled (see 8.4).`,
        auditQuestions: [
          'Are process control parameters and acceptance criteria defined for product manufacturing or service delivery?',
          'How are planned changes controlled and consequences of unintended changes reviewed?',
          'Are outsourced processes identified, controlled, and monitored for quality compliance?'
        ],
        departments: ['Production', 'Logistics', 'Quality Assurance']
      },
      '8.2': {
        id: '8.2',
        title: 'Requirements for products and services',
        definition: 'Establish customer communication, determine requirements, and conduct reviews prior to commitment.',
        fullRequirements: `8.2.1 Customer communication
Communication with customers shall include:
a) providing information relating to products and services;
b) handling enquiries, contracts or orders, including changes;
c) obtaining customer feedback relating to products and services, including customer complaints;
d) handling or controlling customer property;
e) establishing specific requirements for contingency actions, when relevant.
8.2.2 Determining the requirements for products and services
When determining the requirements for the products and services to be offered to customers, the organization shall ensure that:
a) the requirements for the products and services are defined, including:
1) any applicable statutory and regulatory requirements;
2) those considered necessary by the organization;
b) the organization can meet the claims for the products and services it offers.
8.2.3 Review of the requirements for products and services
8.2.3.1 The organization shall ensure that it has the ability to meet the requirements for products and services to be offered to customers. The organization shall conduct a review before committing to supply products and services to a customer, to include:
a) requirements specified by the customer, including the requirements for delivery and post-delivery activities;
b) requirements not stated by the customer, but necessary for the specified or intended use, when known;
c) requirements specified by the organization;
d) statutory and regulatory requirements applicable to the products and services;
e) contract or order requirements differing from those previously expressed.
8.2.3.2 The organization shall retain documented information, as applicable on the results of the review and on any new requirements.
8.2.4 Changes to requirements for products and services
The organization shall ensure that relevant documented information is amended, and that relevant persons are made aware of the changed requirements.`,
        auditQuestions: [
          'Is customer feedback, contract review, and order change handling documented?',
          'Does the organization review capability to meet requirements before committing to supply products/services?',
          'Are statutory, regulatory, and safety requirements identified and reviewed for each product line?'
        ],
        departments: ['Sales', 'Engineering']
      },
      '8.3': {
        id: '8.3',
        title: 'Design and development of products and services',
        definition: 'Establish, implement, and maintain a design and development process.',
        fullRequirements: `8.3.1 General
The organization shall establish, implement and maintain a design and development process that is appropriate to ensure the subsequent provision of products and services.
8.3.2 Design and development planning
In determining the stages and controls for design and development, the organization shall consider:
a) the nature, duration and complexity of the design and development activities;
b) the required process stages, including applicable design and development reviews;
c) the required design and development verification and validation activities;
d) the responsibilities and authorities involved in the design and development process;
e) the internal and external resource needs for the design and development of products and services;
f) the need to control interfaces between persons involved in the design and development process;
g) the need for involvement of customers and users in the design and development process;
h) the requirements for subsequent provision of products and services;
i) the level of control expected for the design and development process by customers and other relevant interested parties;
j) the documented information needed to demonstrate that design and development requirements have been met.
8.3.3 Design and development inputs
The organization shall determine the requirements essential for the specific types of products and services to be designed and developed. The organization shall consider:
a) functional and performance requirements;
b) information derived from previous similar design and development activities;
c) statutory and regulatory requirements;
d) standards or codes of practice that the organization has committed to implement;
e) potential consequences of failure due to the nature of the products and services.
8.3.4 Design and development controls
The organization shall apply controls to the design and development process to ensure that:
a) the results to be achieved are defined;
b) reviews are conducted to evaluate the ability of the results of design and development to meet requirements;
c) verification activities are conducted to ensure that the design and development outputs meet the input requirements;
d) validation activities are conducted to ensure that the resulting products and services meet the requirements for the specified application or intended use;
e) any necessary actions are taken on problems determined during the reviews, or verification and validation activities;
f) documented information of these activities is retained.
8.3.5 Design and development outputs
The organization shall ensure that design and development outputs meet the input requirements and are adequate for the subsequent processes.
8.3.6 Design and development changes
The organization shall identify, review and control changes made during, or subsequent to, the design and development of products and services.`,
        auditQuestions: [
          'Are design stages, reviews, verifications, and validations planned and documented?',
          'How are design inputs defined, design outputs controlled, and design changes tracked?',
          'Are design outputs verified against input requirements prior to release to production?'
        ],
        departments: ['Engineering']
      },
      '8.4': {
        id: '8.4',
        title: 'Control of externally provided processes, products and services',
        definition: 'Ensure externally provided processes, products, and services conform to requirements.',
        fullRequirements: `8.4.1 General
The organization shall ensure that externally provided processes, products and services conform to requirements.
The organization shall determine the controls to be applied to externally provided processes, products and services when:
a) products and services from external providers are intended for incorporation into the organization's own products and services;
b) products and services are provided directly to the customer(s) by external providers on behalf of the organization;
c) a process, or part of a process, is provided by an external provider as a result of a decision by the organization.
The organization shall determine and apply criteria for the evaluation, selection, monitoring of performance, and re-evaluation of external providers, based on their ability to provide processes or products and services in accordance with requirements. The organization shall retain documented information of these activities and any necessary actions arising from the evaluations.
8.4.2 Type and extent of control
The organization shall ensure that externally provided processes, products and services do not adversely affect the organization's ability to consistently deliver conforming products and services to its customers.
The organization shall:
a) ensure that externally provided processes remain within the control of its quality management system;
b) define both the controls that it intends to apply to an external provider and those it intends to apply to the resulting output;
c) take into consideration:
1) the potential impact of the externally provided processes, products and services on the organization's ability to consistently meet customer and applicable statutory and regulatory requirements;
2) the effectiveness of the controls applied by the external provider;
d) determine the verification, or other activities, necessary to ensure that the externally provided processes, products and services meet requirements.
8.4.3 Information for external providers
The organization shall ensure the adequacy of requirements prior to their communication to the external provider.`,
        auditQuestions: [
          'Is there an approved supplier list (ASL) and documented criteria for supplier evaluation and re-evaluation?',
          'Are incoming products or services verified against procurement specifications before release?',
          'Are supplier performance metrics (quality, delivery) tracked and corrective actions issued to poor performers?'
        ],
        departments: ['Procurement', 'Quality Assurance', 'Logistics']
      },
      '8.5': {
        id: '8.5',
        title: 'Production and service provision',
        definition: 'Implement production and service provision under controlled conditions.',
        fullRequirements: `8.5.1 Control of production and service provision
The organization shall implement production and service provision under controlled conditions.
Controlled conditions shall include, as applicable:
a) the availability of documented information that defines:
1) the characteristics of the products to be produced, the services to be provided, or the activities to be performed;
2) the results to be achieved;
b) the availability and use of suitable monitoring and measuring resources;
c) the implementation of monitoring and measurement activities at appropriate stages to verify that criteria for control of processes or outputs, and acceptance criteria for products and services, have been met;
d) the use of suitable infrastructure and environment for the operation of processes;
e) the appointment of competent persons, including any required qualification;
f) the validation, and periodic revalidation, of the ability to achieve planned results of the processes for production and service provision, where the resulting output cannot be verified by subsequent monitoring or measurement;
g) the implementation of actions to prevent human error;
h) the implementation of release, delivery and post-delivery activities.
8.5.2 Identification and traceability
The organization shall use suitable means to identify outputs when it is necessary to ensure the conformity of products and services.
The organization shall identify the status of outputs with respect to monitoring and measurement requirements throughout production and service provision.
The organization shall control the unique identification of the outputs when traceability is a requirement, and shall retain the documented information necessary to enable traceability.
8.5.3 Property belonging to customers or external providers
The organization shall exercise care with property belonging to customers or external providers while it is under the organization's control or being used by the organization.
8.5.4 Preservation
The organization shall preserve the outputs during production and service provision, to the extent necessary to ensure conformity to requirements.
8.5.5 Post-delivery activities
The organization shall meet requirements for post-delivery activities associated with the products and services.
8.5.6 Control of changes
The organization shall review and control changes for production or service provision, to the extent necessary to ensure continuing conformity with requirements.`,
        auditQuestions: [
          'Are work instructions, control plans, and suitable equipment available on the production floor?',
          'How does the organization ensure product identification and traceability throughout the process?',
          'Is customer property (data, materials, packaging) identified, verified, and protected?'
        ],
        departments: ['Production', 'Logistics']
      },
      '8.6': {
        id: '8.6',
        title: 'Release of products and services',
        definition: 'Implement planned arrangements at appropriate stages to verify that requirements have been met.',
        fullRequirements: `The organization shall implement planned arrangements, at appropriate stages, to verify that the product and service requirements have been met.
The release of products and services to the customer shall not proceed until the planned arrangements have been satisfactorily completed, unless otherwise approved by a relevant authority and, as applicable, by the customer.
The organization shall retain documented information on the release of products and services. The documented information shall include:
a) evidence of conformity with the acceptance criteria;
b) traceability to the person(s) authorizing the release.`,
        auditQuestions: [
          'Are final inspection records maintained, showing evidence of conformity and release authority?',
          'How are product dimensions, specs, or parameters verified before final release to shipment?',
          'Are deviations or emergency releases authorized by competent authorities and documented?'
        ],
        departments: ['Quality Assurance', 'Logistics']
      },
      '8.7': {
        id: '8.7',
        title: 'Control of nonconforming outputs',
        definition: 'Ensure nonconforming outputs are identified and controlled to prevent unintended use.',
        fullRequirements: `8.7.1 The organization shall ensure that outputs that do not conform to their requirements are identified and controlled to prevent their unintended use or delivery.
The organization shall take appropriate action based on the nature of the nonconformity and its effect on the conformity of products and services. This shall also apply to nonconforming products and services detected after delivery of products, during or after the provision of services.
The organization shall deal with nonconforming outputs in one or more of the following ways:
a) correction;
b) segregation, containment, return or suspension of provision of products and services;
c) informing the customer;
d) obtaining authorization for acceptance under concession.
Conformity to the requirements shall be verified when nonconforming outputs are corrected.
8.7.2 The organization shall retain documented information that:
a) describes the nonconformity;
b) describes the actions taken;
c) describes any concessions obtained;
d) identifies the authority deciding the action in respect of the nonconformity.`,
        auditQuestions: [
          'Are nonconforming products segregated, tagged, and logged to prevent accidental shipment?',
          'Is there clear documentation of dispositions (scrap, rework, concession, return) with responsible approvals?',
          'Are reworked items re-inspected to verify conformance to original requirements?'
        ],
        departments: ['Production', 'Quality Assurance']
      }
    }
  },
  '9': {
    id: '9',
    title: 'Performance Evaluation',
    subclauses: {
      '9.1': {
        id: '9.1',
        title: 'Monitoring, measurement, analysis and evaluation',
        definition: 'Determine what needs monitoring, methods to ensure valid results, and evaluate performance.',
        fullRequirements: `9.1.1 General
The organization shall determine:
a) what needs to be monitored and measured;
b) the methods for monitoring, measurement, analysis and evaluation needed to ensure valid results;
c) when the monitoring and measuring shall be performed;
d) when the results from monitoring and measurement shall be analysed and evaluated.
The organization shall evaluate the performance and the effectiveness of the quality management system.
The organization shall retain appropriate documented information as evidence of the results.
9.1.2 Customer satisfaction
The organization shall monitor customers' perceptions of the degree to which their needs and expectations have been fulfilled. The organization shall determine the methods for obtaining, monitoring and reviewing this information.
9.1.3 Analysis and evaluation
The organization shall analyse and evaluate appropriate data and information arising from monitoring and measurement.
The results of analysis shall be used to evaluate:
a) conformity of products and services;
b) the degree of customer satisfaction;
c) the performance and effectiveness of the quality management system;
d) if planning has been implemented effectively;
e) the effectiveness of actions taken to address risks and opportunities;
f) the performance of external providers;
g) the need for improvements to the quality management system.`,
        auditQuestions: [
          'What quality performance metrics (KPIs) are tracked, and how is customer satisfaction measured?',
          'Is data analyzed for trends, supplier quality, audit results, and risk mitigation effectiveness?',
          'Are analysis results reported to top management for strategic planning reviews?'
        ],
        departments: ['Quality Assurance', 'Sales', 'Production']
      },
      '9.2': {
        id: '9.2',
        title: 'Internal audit',
        definition: 'Conduct internal audits at planned intervals to verify QMS conformance and effectiveness.',
        fullRequirements: `9.2.1 The organization shall conduct internal audits at planned intervals to provide information on whether the quality management system:
a) conforms to:
1) the organization's own requirements for its quality management system;
2) the requirements of this International Standard;
b) is effectively implemented and maintained.
9.2.2 The organization shall:
a) plan, establish, implement and maintain an audit programme(s) including the frequency, methods, responsibilities, planning requirements and reporting, which shall take into consideration the importance of the processes concerned, changes affecting the organization, and the results of previous audits;
b) define the audit criteria and scope for each audit;
c) select auditors and conduct audits to ensure objectivity and the impartiality of the audit process;
d) ensure that the results of the audits are reported to relevant management;
e) take appropriate correction and corrective actions without undue delay;
f) retain documented information as evidence of the implementation of the audit programme and the audit results.`,
        auditQuestions: [
          'Is there an annual audit schedule covering all departments and ISO 9001 clauses?',
          'Are internal auditors independent of the processes being audited to ensure objectivity?',
          'Are audit findings, non-conformances (NCRs), and opportunities for improvement (OFIs) logged and resolved?'
        ],
        departments: ['Quality Assurance']
      },
      '9.3': {
        id: '9.3',
        title: 'Management review',
        definition: 'Top management must review the QMS at planned intervals to ensure suitability and alignment.',
        fullRequirements: `9.3.1 General
Top management shall review the organization's quality management system, at planned intervals, to ensure its continuing suitability, adequacy, effectiveness and alignment with the strategic direction of the organization.
9.3.2 Management review inputs
The management review shall be planned and carried out taking into consideration:
a) the status of actions from previous management reviews;
b) changes in external and internal issues that are relevant to the quality management system;
c) information on the performance and effectiveness of the quality management system, including trends in:
1) customer satisfaction and feedback from relevant interested parties;
2) the extent to which quality objectives have been met;
3) process performance and conformity of products and services;
4) nonconformities and corrective actions;
5) monitoring and measurement results;
6) audit results;
7) the performance of external providers;
d) the adequacy of resources;
e) the effectiveness of actions taken to address risks and opportunities (see 6.1);
f) opportunities for improvement.
9.3.3 Management review outputs
The outputs of the management review shall include decisions and actions related to:
a) opportunities for improvement;
b) any need for changes to the quality management system;
c) resource needs.
The organization shall retain documented information as evidence of the results of management reviews.`,
        auditQuestions: [
          'Are management reviews conducted at planned intervals with defined input metrics (audits, complaints, risks)?',
          'Are meeting minutes and action items (decisions, resource needs, changes) documented and tracked?',
          'Is there evidence of follow-up on actions decided during previous management reviews?'
        ],
        departments: ['Quality Assurance', 'Sales']
      }
    }
  },
  '10': {
    id: '10',
    title: 'Improvement',
    subclauses: {
      '10.1': {
        id: '10.1',
        title: 'General improvement requirements',
        definition: 'Determine opportunities for improvement to meet customer requirements.',
        fullRequirements: `The organization shall determine and select opportunities for improvement and implement any necessary actions to meet customer requirements and enhance customer satisfaction.
These shall include:
a) improving products and services to meet requirements as well as to address future needs and expectations;
b) correcting, preventing or reducing undesired effects;
c) improving the performance and effectiveness of the quality management system.`,
        auditQuestions: [
          'Does the organization actively seek opportunities to improve processes, products, and QMS results?',
          'Are customer feedback trends and complaints analyzed to identify areas for preventative improvements?',
          'How does the organization prioritize and resource improvement initiatives?'
        ],
        departments: ['Quality Assurance', 'Engineering']
      },
      '10.2': {
        id: '10.2',
        title: 'Nonconformity and corrective action',
        definition: 'React to nonconformities, control them, and eliminate causes to prevent recurrence.',
        fullRequirements: `10.2.1 When a nonconformity occurs, including any arising from complaints, the organization shall:
a) react to the nonconformity and, as applicable:
1) take action to control and correct it;
2) deal with the consequences;
b) evaluate the need for action to eliminate the cause(s) of the nonconformity, in order that it does not recur or occur elsewhere, by:
1) reviewing and analysing the nonconformity;
2) determining the causes of the nonconformity;
3) determining if similar nonconformities exist, or could potentially occur;
c) implement any action needed;
d) review the effectiveness of any corrective action taken;
e) update risks and opportunities determined during planning, if necessary;
f) make changes to the quality management system, if necessary.
Corrective actions shall be appropriate to the effects of the nonconformities encountered.
10.2.2 The organization shall retain documented information as evidence of:
a) the nature of the nonconformities and any subsequent actions taken;
b) the results of any corrective action.`,
        auditQuestions: [
          'Are Corrective and Preventive Actions (CAPAs) logged with clear root causes identified using "5 Whys" or fishbone diagramming?',
          'Are corrective actions implemented globally to prevent recurrence of similar issues?',
          'Is the effectiveness of implemented corrective actions verified after a specified interval?'
        ],
        departments: ['Quality Assurance', 'Production', 'Logistics', 'Procurement']
      },
      '10.3': {
        id: '10.3',
        title: 'Continual improvement',
        definition: 'Continually improve the suitability, adequacy, and effectiveness of the QMS.',
        fullRequirements: `The organization shall continually improve the suitability, adequacy and effectiveness of the quality management system.
The organization shall consider the results of analysis and evaluation, and the outputs from management review, to determine if there are needs or opportunities that shall be addressed as part of continual improvement.`,
        auditQuestions: [
          'Is there evidence of QMS maturity and continual improvement over time?',
          'Are lean, Six Sigma, or regular Kaizen improvement methods integrated into operations?',
          'Do teams review trend charts and historical audit scores to target operational improvements?'
        ],
        departments: ['Quality Assurance', 'Production', 'Engineering']
      }
    }
  }
};

/**
 * Returns all sub-clauses flattened as a single array
 */
export function getAllSubClauses(): SubClauseDefinition[] {
  const list: SubClauseDefinition[] = [];
  Object.values(ISO_9001_2015_MASTER).forEach((clause) => {
    Object.values(clause.subclauses).forEach((sub) => {
      list.push(sub);
    });
  });
  return list;
}

/**
 * Gets a specific sub-clause by ID (e.g. "8.4")
 */
export function getSubClauseById(id: string): SubClauseDefinition | undefined {
  const parts = id.split('.');
  if (parts.length < 2) return undefined;
  const mainKey = parts[0];
  const mainClause = ISO_9001_2015_MASTER[mainKey];
  if (!mainClause) return undefined;
  return mainClause.subclauses[id];
}
