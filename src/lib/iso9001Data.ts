// ============================================================
// IsoPulse — Master ISO 9001:2015 Clause Database
// Authoritative definitions and pre-built checklist questions
// ============================================================

export interface SubClauseDefinition {
  id: string; // e.g. "4.1"
  title: string;
  definition: string;
  auditQuestions: string[];
  departments: string[];
}

export interface MainClauseDefinition {
  id: string; // e.g. "4"
  title: string;
  subclauses: Record<string, SubClauseDefinition>;
}

export const ISO_9001_2015_MASTER: Record<string, MainClauseDefinition> = {
  '4': {
    id: '4',
    title: 'Context of the Organization',
    subclauses: {
      '4.1': {
        id: '4.1',
        title: 'Understanding the organization and its context',
        definition: 'Determine external and internal issues that are relevant to the organization\'s purpose and strategic direction, and that affect its ability to achieve QMS outcomes.',
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
        definition: 'Top management must demonstrate leadership and commitment by taking accountability for QMS effectiveness, ensuring the Quality Policy and objectives are established, and promoting improvement.',
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
        definition: 'Establish, implement, and maintain a quality policy that is appropriate to the purpose and context of the organization, provides a framework for setting objectives, and includes a commitment to satisfy requirements.',
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
        definition: 'Ensure that responsibilities and authorities for relevant roles are assigned, communicated, and understood within the organization.',
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
        definition: 'Determine risks and opportunities that need to be addressed to give assurance that the QMS can achieve its outcomes, prevent undesired effects, and achieve improvement.',
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
        definition: 'Establish quality objectives at relevant functions, levels, and processes that are measurable, consistent with the Quality Policy, and monitored.',
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
        definition: 'Carry out QMS changes in a planned and systematic manner, considering the purpose of the changes, availability of resources, and allocation of responsibilities.',
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
        definition: 'Determine and provide the resources (people, infrastructure, environment for process operation, monitoring and measuring resources) needed for QMS implementation.',
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
        definition: 'Determine the necessary competence of person(s) doing work under QMS control, ensure competence on the basis of education/training, and take actions to acquire competence.',
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
        definition: 'Ensure persons doing work under organization control are aware of the Quality Policy, quality objectives, their contribution to QMS effectiveness, and implications of non-conformance.',
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
        definition: 'Determine the internal and external communications relevant to the QMS, including what, when, with whom, how, and who communicates.',
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
        definition: 'Ensure the QMS includes documented information required by ISO 9001 and determined by the organization, including its creation, control, and update cycle.',
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
        definition: 'Plan, implement, and control the processes needed to meet requirements for products and services, and to implement actions to address risk.',
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
        definition: 'Establish communication with customers, determine requirements for products/services (including statutory/regulatory), and conduct reviews of these requirements.',
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
        definition: 'Establish, implement, and maintain a design and development process that is appropriate to ensure the subsequent provision of products and services.',
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
        definition: 'Ensure that externally provided processes, products, and services conform to requirements. Evaluate, select, and monitor external providers.',
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
        definition: 'Implement production and service provision under controlled conditions, including control of outputs, identification/traceability, property belonging to customers, and post-delivery activities.',
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
        definition: 'Implement planned arrangements at appropriate stages to verify that product/service requirements have been met. Do not release until completed satisfactorily.',
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
        definition: 'Ensure that outputs that do not conform to their requirements are identified and controlled to prevent their unintended use or delivery.',
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
        definition: 'Determine what needs to be monitored and measured, methods to ensure valid results, and evaluate the QMS performance and effectiveness.',
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
        definition: 'Conduct internal audits at planned intervals to provide information on whether the QMS conforms to standard requirements and is effectively implemented.',
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
        definition: 'Top management must review the QMS at planned intervals to ensure its continuing suitability, adequacy, effectiveness, and alignment with strategic direction.',
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
        definition: 'Determine and select opportunities for improvement and implement any necessary actions to meet customer requirements and enhance satisfaction.',
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
        definition: 'When a nonconformity occurs, react to it, control/correct it, deal with consequences, and eliminate the cause through root cause analysis to prevent recurrence.',
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
        definition: 'Continually improve the suitability, adequacy, and effectiveness of the QMS using analysis results, audit findings, and management review outputs.',
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
