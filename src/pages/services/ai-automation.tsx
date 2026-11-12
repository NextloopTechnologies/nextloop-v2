import type { GetStaticProps } from 'next';
import Link from 'next/link';
import React from 'react';

import AiLeadForm from '../../components/AiServicePages/AiLeadForm';
import AiServiceShell from '../../components/AiServicePages/AiServiceShell';
import BlogSection from '../../components/BlogSection';
import { BlogData } from '../../types';
import { fetchLatestBlogs } from '../../utils/fetchBlogdata';

const TITLE = 'AI Automation Services | Custom AI Agents | Nextloop';
const DESC =
  'Hire Nextloop for AI automation services: custom AI agents, document processing and workflow automation in your private cloud. Serving the USA & India.';

const faqs = [
  {
    q: 'Will our company data be shared with public AI models like ChatGPT?',
    a: "No. We deploy models inside your own AWS or Azure account and use enterprise model endpoints that don't retain or train on your data. Your documents never pass through consumer chat tools, and access is controlled by your existing identity provider.",
  },
  {
    q: 'Do you provide AI automation services in the USA?',
    a: 'Yes. We work with companies in the USA as well as India. Projects are delivered remotely by our in-house engineering team, and we can deploy in your AWS or Azure US region so data stays where your compliance team needs it.',
  },
  {
    q: 'What is the difference between an off-the-shelf AI tool and a custom AI agent?',
    a: "Off-the-shelf tools answer from general internet knowledge and can't act inside your systems. A custom agent answers only from your approved documents, follows your business rules, cites its sources and can update your CRM, ERP or internal apps.",
  },
  {
    q: 'How long does it take to deploy a custom AI automation workflow?',
    a: 'A focused pilot on one workflow typically goes live in a matter of weeks. Larger, multi-system rollouts are delivered in phases after the pilot proves its value.',
  },
  {
    q: 'How do you stop the AI from making things up?',
    a: "We use retrieval-augmented generation (RAG), so the AI can only answer from your verified documents and shows the source for each answer. If the information isn't in your sources, it says so instead of guessing. We also test every system against an accuracy benchmark you approve before launch.",
  },
  {
    q: 'Do we need a lot of data to get started?',
    a: 'No. Most of our AI agents work with the documents you already have, such as policies, contracts, manuals and past tickets. We check data quality during the audit and tell you upfront if anything needs cleaning.',
  },
  {
    q: 'Can the AI work with our existing software?',
    a: 'Yes. We integrate with Salesforce, SAP, HubSpot, Microsoft 365, Google Workspace and custom applications through their APIs. Your team keeps using the same tools; the AI works in the background.',
  },
  {
    q: 'Who owns the code and the AI system?',
    a: 'You do. Every engagement is covered by an NDA and a contract that assigns all IP to you. Source code, prompts, pipelines and configuration are handed over and run in your own infrastructure.',
  },
  {
    q: 'What happens when the AI isn’t sure about an answer?',
    a: 'You set a confidence threshold. Anything below it goes to a human reviewer, and those corrections are used to improve the system over time.',
  },
  {
    q: 'How much does AI automation cost, and how is pricing structured?',
    a: 'Most clients start with a fixed-price audit or pilot, followed by a project fee for full deployment and an optional monthly support plan. Model usage is billed through your own cloud account.',
  },
  {
    q: 'Will AI replace our staff?',
    a: 'Our goal is to remove repetitive work like data entry, document checking and routine queries, so your team can spend time on decisions and customers. Most clients redeploy saved hours to higher-value work rather than reduce headcount.',
  },
];

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'AI Automation Services',
    provider: { '@type': 'Organization', name: 'Nextloop Technologies' },
    areaServed: ['India', 'United States'],
    url: 'https://www.nextlooptechnologies.com/services/ai-automation/',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  },
];

const AiAutomation: React.FC<{ blogData: BlogData[] }> = ({ blogData }) => (
  <AiServiceShell title={TITLE} description={DESC} jsonLd={jsonLd}>
    <div className='hero'>
      <div className='w'>
        <div>
          <h1>
            AI Automation Services for Enterprises: Custom AI Agents &amp;
            Workflow Automation
          </h1>
          <p>
            Stop paying people to re-key data and chase documents. Nextloop is
            an AI automation company that builds custom AI agents, intelligent
            document processing and AI workflow automation that connect to the
            software you already use. Every model runs in your own private
            cloud, answers only from your verified documents and never trains on
            your data. We deliver AI automation services to businesses in India
            and the USA, with the same secure, in-house engineering team on
            every project.
          </p>
          <div className='row'>
            <a className='btn' href='#cta'>
              Schedule an AI Consultation
            </a>
            <a className='btn o' href='#services'>
              Explore Our AI Solutions
            </a>
          </div>
        </div>
        <div className='panel'>
          <div>
            <b>120+</b>
            <span>Projects delivered</span>
          </div>
          <div>
            <b>9 years</b>
            <span>In operation</span>
          </div>
          <div>
            <b>100%</b>
            <span>Private-cloud AI deployments</span>
          </div>
        </div>
      </div>
    </div>

    <div className='trust'>
      <div className='w'>
        <div>
          <h2>Trusted by Teams Who Can&apos;t Afford AI Mistakes</h2>
          <p>
            Legal-tech platforms, EdTech companies and finance teams choose our
            AI automation services to remove manual work without exposing
            confidential data. We also work with US-based companies, so your
            team is never waiting a day for an answer.
          </p>
        </div>
        <div className='logos'>
          <span>Jhana</span>
          <span>TryArk</span>
        </div>
      </div>
    </div>

    <section className='cream'>
      <div className='w'>
        <h2>Why Choose Nextloop as Your AI &amp; Automation Partner</h2>
        <p className='lead'>
          Most AI pilots stall on one question: is our data safe? We design for
          that answer first. As an AI automation agency focused on enterprise
          work, we build private, auditable systems that plug into your existing
          workflows, for clients in the USA and India alike, so you see
          measurable results without handing your data to a public chatbot.
        </p>
        <div className='why'>
          <div>
            <h3>Private, closed-loop architecture</h3>
            <p>
              We deploy models in your own AWS or Azure account. Your data is
              never fed into public LLMs like ChatGPT or used to train anyone
              else&apos;s model.
            </p>
          </div>
          <div>
            <h3>Answers grounded in your documents</h3>
            <p>
              Using retrieval-augmented generation (RAG), our AI answers only
              from your verified company documents and cites the source for
              every response.
            </p>
          </div>
          <div>
            <h3>Seamless tech stack integration</h3>
            <p>
              We don&apos;t ask you to buy new platforms. Our AI integration
              services connect to Salesforce, SAP, your ERP and the internal
              apps your team already uses.
            </p>
          </div>
          <div>
            <h3>In-house AI engineers</h3>
            <p>
              Every project is built by full-time Nextloop engineers, not
              freelancers. One accountable team owns your system from audit to
              support.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section>
      <div className='w'>
        <h2>Manual Work vs Off-the-Shelf AI vs Nextloop Custom AI</h2>
        <p className='lead'>
          See how a custom, private AI system compares with manual processes and
          generic AI tools on the factors that drive cost, accuracy and risk.
        </p>
        <div className='tw'>
          <table>
            <thead>
              <tr>
                <th>Metric</th>
                <th>Manual Processes</th>
                <th>Off-the-Shelf AI Tools</th>
                <th>Nextloop Custom AI</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Data privacy</td>
                <td>Data stays in-house but is handled by many people</td>
                <td>
                  Data often leaves your environment for a third-party server
                </td>
                <td>
                  Runs in your own AWS or Azure account, never used for training
                </td>
              </tr>
              <tr>
                <td>Accuracy</td>
                <td>Prone to typing and copy-paste errors</td>
                <td>May give confident but unsourced or invented answers</td>
                <td>Answers only from your documents, with source citations</td>
              </tr>
              <tr>
                <td>Integration</td>
                <td>Staff re-key data between systems</td>
                <td>Separate app; copy and paste in and out</td>
                <td>Reads and writes directly to your CRM, ERP and apps</td>
              </tr>
              <tr>
                <td>Scalability</td>
                <td>More volume means more hires</td>
                <td>Per-seat pricing grows with your team</td>
                <td>Handles volume spikes without extra headcount</td>
              </tr>
              <tr>
                <td>Ownership</td>
                <td>Knowledge sits with individual staff</td>
                <td>Locked into the vendor&apos;s platform</td>
                <td>You own the code, prompts, pipelines and data</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className='fn'>
          Comparison reflects typical characteristics of each approach.
        </p>
        <div className='row'>
          <a className='btn' href='#cta'>
            Get a Free Workflow Assessment
          </a>
        </div>
      </div>
    </section>

    <div className='band'>
      <div className='w'>
        <div>
          <h2>Not Sure Which Workflow to Automate First?</h2>
          <p>
            Tell us where your team loses the most hours. Our AI consulting team
            will identify the highest-ROI automation opportunity and outline a
            secure approach. Available for teams in the USA and India.
          </p>
        </div>
        <div className='row' style={{ margin: 0 }}>
          <a className='btn' href='#cta'>
            Schedule an AI Consultation
          </a>
          <Link className='btn o' href='/portfolio/'>
            View AI Case Studies
          </Link>
        </div>
      </div>
    </div>

    <section>
      <div className='w'>
        <h2>How Our AI Automation Process Works</h2>
        <p className='lead'>
          Five steps from first conversation to a production AI system. You see
          a working pilot on your own data before you commit to a full rollout.
        </p>
        <ol className='tl'>
          <li>
            <h3>Workflow audit</h3>
            <p>
              We map your manual bottlenecks, the data behind them and what
              success looks like in numbers.
            </p>
          </li>
          <li>
            <h3>Architecture &amp; security design</h3>
            <p>
              We choose the right models, plan integrations and agree access and
              data rules with your IT team.
            </p>
          </li>
          <li>
            <h3>Pilot on your data</h3>
            <p>
              A working pilot on real documents, tested against accuracy
              benchmarks you sign off on.
            </p>
          </li>
          <li>
            <h3>Integration &amp; launch</h3>
            <p>
              We connect the AI to your systems, train your staff and move the
              workflow into production.
            </p>
          </li>
          <li>
            <h3>Monitor &amp; improve</h3>
            <p>
              Ongoing tracking of accuracy, usage and cost, with regular tuning
              as your documents and needs change.
            </p>
          </li>
        </ol>
      </div>
    </section>

    <section className='dark'>
      <div className='w sec'>
        <div>
          <h2>Enterprise-Grade Security for Your AI Systems</h2>
          <p className='lead' style={{ marginBottom: 0 }}>
            Confidential contracts, financial records and student data need
            stronger protection than a public chatbot can offer. These controls
            are part of every AI engagement, including those for US clients.
          </p>
          <p className='note'>
            Client work is handled under ISO 27001-certified security processes.
          </p>
          <div className='row'>
            <a className='btn' href='#cta'>
              Talk to Us About Your Security Requirements
            </a>
          </div>
        </div>
        <div>
          <div className='it'>
            <h3>Deployed in your private cloud</h3>
            <p>
              Models, vector databases and pipelines run inside your own AWS or
              Azure account, in the region you choose, including US regions.
              Your documents never leave your environment.
            </p>
          </div>
          <div className='it'>
            <h3>No training on your data</h3>
            <p>
              We use enterprise model endpoints with zero data retention.
              Nothing you upload is used to train a public model.
            </p>
          </div>
          <div className='it'>
            <h3>Access control &amp; audit logs</h3>
            <p>
              Role-based permissions mean staff only see what they&apos;re
              allowed to see, and every AI answer and action is logged for
              review.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section id='services'>
      <div className='w'>
        <h2>Our Core AI &amp; Automation Services</h2>
        <p className='lead'>
          Start with the service that removes your biggest bottleneck. Most
          clients begin with one workflow and expand once it pays for itself.
        </p>
        <div className='svc'>
          <div>
            <i>A</i>
            <div>
              <h3>Intelligent Document Processing (OCR &amp; NLP)</h3>
              <p>
                Our intelligent document processing services turn unstructured
                PDFs, emails and compliance forms into clean, automated entries
                in your CRM or ERP. Low-confidence fields go to a human
                reviewer.
              </p>
              <em>Best for: invoices, contracts, KYC forms, applications</em>
            </div>
          </div>
          <div>
            <i>B</i>
            <div>
              <h3>Custom AI Agent Development &amp; Copilots</h3>
              <p>
                Private AI assistants trained exclusively on your internal
                rulebooks, policies and past tickets to handle support, employee
                queries and internal knowledge search.
              </p>
              <em>
                Best for: helpdesk agents, policy copilots, knowledge search
              </em>
            </div>
          </div>
          <div>
            <i>C</i>
            <div>
              <h3>AI-Driven System Integration</h3>
              <p>
                Connect your existing software stack with intelligent API
                pipelines that trigger automated workflows, so data moves
                between systems without anyone re-keying it.
              </p>
              <em>Works with: Salesforce, SAP, HubSpot, custom APIs</em>
            </div>
          </div>
          <div>
            <i>D</i>
            <div>
              <h3>AI Strategy &amp; Consulting</h3>
              <p>
                We audit your manual bottlenecks and build a high-ROI, secure AI
                roadmap, with cost and payback estimated for each use case.
              </p>
              <em>Includes: workflow audit, build vs buy, AI roadmap</em>
            </div>
          </div>
          <div>
            <i>E</i>
            <div>
              <h3>Agentic Workflow Automation</h3>
              <p>
                Multi-step AI agents that read, decide and act across systems,
                such as routing tickets, approving routine requests or chasing
                missing documents.{' '}
                <Link className='inline' href='/services/ai-ml/'>
                  Learn more about our AI/ML services
                </Link>
              </p>
            </div>
          </div>
        </div>
        <div className='row'>
          <a className='btn' href='#cta'>
            Discuss Your Use Case
          </a>
        </div>
      </div>
    </section>

    <section className='cream'>
      <div className='w'>
        <h2>Industry-Specific AI Capabilities</h2>
        <p className='lead'>
          We&apos;ve shipped production AI in sectors where accuracy and
          confidentiality aren&apos;t optional. Here is what our AI handles in
          each.
        </p>
        <div className='nl-cap-grid'>
          <div className='nl-cap-card'>
            <h3>Legal &amp; Compliance</h3>
            <small>Case study: Jhana</small>
            <ul>
              <li>Contract analysis and clause extraction</li>
              <li>High-accuracy summaries with cited sources</li>
              <li>Secure case law retrieval</li>
            </ul>
          </div>
          <div className='nl-cap-card'>
            <h3>EdTech &amp; Operations</h3>
            <small>Case study: TryArk</small>
            <ul>
              <li>AI-native operating systems</li>
              <li>Student enrolment automation</li>
              <li>Resource allocation</li>
            </ul>
          </div>
          <div className='nl-cap-card'>
            <h3>Finance &amp; Administration</h3>
            <ul>
              <li>Automated invoice extraction</li>
              <li>Risk profiling</li>
              <li>KYC automation</li>
            </ul>
          </div>
        </div>
        <div className='row'>
          <a className='btn' href='#cta'>
            See What AI Can Do for Your Industry
          </a>
        </div>
      </div>
    </section>

    <section>
      <div className='w'>
        <h2>Flexible Engagement Models for Every Stage of AI Adoption</h2>
        <p className='lead'>
          Start small, prove the value, then scale. You can move between models
          as your confidence and roadmap grow.
        </p>
        <div className='mods'>
          <div>
            <h3>AI Audit &amp; Roadmap</h3>
            <p>
              A fixed-scope review of your workflows and data, ending with a
              prioritised list of AI use cases, cost estimates and a security
              plan. Best if you&apos;re still deciding where AI fits.
            </p>
          </div>
          <div>
            <h3>Pilot Project</h3>
            <p>
              One workflow automated end to end on your real data, with agreed
              accuracy targets. Best for proving ROI to leadership before a
              larger investment.
            </p>
          </div>
          <div>
            <h3>Full Deployment &amp; Managed AI</h3>
            <p>
              Production rollout across teams and systems, plus ongoing
              monitoring, tuning and support. Best when you&apos;re ready to
              scale automation company-wide.
            </p>
          </div>
        </div>
        <div className='cost'>
          <div>
            <h3>How Much Does AI Automation Cost?</h3>
            <p>
              AI automation cost depends on the number of workflows, document
              volume, integrations, model choice and hosting. We share a custom
              quote after understanding your use case.
            </p>
            <div className='row'>
              <a className='btn' href='#cta'>
                Get a Custom Quote
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className='cream'>
      <div className='w'>
        <h2>AI That Works Inside Your Business</h2>
        <p className='lead'>
          Our AI connects to the tools you already use: Salesforce, SAP,
          HubSpot, Slack, Teams, Google Workspace and Microsoft 365.
        </p>
        <div className='nl-fit-grid'>
          <div className='nl-fit-card'>
            <i>1</i>
            <h3>No new platforms to learn</h3>
            <p>
              The AI appears inside the systems your team already works in, so
              adoption happens without retraining.
            </p>
          </div>
          <div className='nl-fit-card'>
            <i>2</i>
            <h3>Humans stay in control</h3>
            <p>
              Low-confidence results go to a person for review, and you set
              which actions the AI can take on its own.
            </p>
          </div>
          <div className='nl-fit-card'>
            <i>3</i>
            <h3>You own everything</h3>
            <p>
              Source code, prompts, pipelines and configuration are handed over
              and run in your infrastructure.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section>
      <div className='w'>
        <h2>The Technology We Build With</h2>
        <p className='lead'>
          We stay model-agnostic, so you can switch providers as prices and
          capabilities change without rebuilding your system.
        </p>
        <div className='nl-cards'>
          <div className='nl-card'>
            <h3>Foundational models</h3>
            <div className='nl-chips'>
              <span>OpenAI</span>
              <span>Anthropic Claude</span>
              <span>Meta Llama</span>
            </div>
          </div>
          <div className='nl-card'>
            <h3>AI frameworks &amp; databases</h3>
            <div className='nl-chips'>
              <span>LangChain</span>
              <span>Pinecone</span>
              <span>Weaviate</span>
              <span>Vector databases</span>
            </div>
          </div>
          <div className='nl-card'>
            <h3>Cloud &amp; infrastructure</h3>
            <div className='nl-chips'>
              <span>AWS Bedrock</span>
              <span>Microsoft Azure AI</span>
              <span>Python</span>
              <span>Node.js</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section>
      <div className='w'>
        <h2>AI &amp; Automation FAQs</h2>
        <div className='faq' style={{ marginTop: 28 }}>
          {faqs.map((item, i) => (
            <details key={item.q} open={i === 0}>
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>

    {blogData.length > 0 && (
      <div className='nl-blog-wrap cream'>
        <BlogSection blogData={blogData} />
      </div>
    )}

    <section className='cta' id='cta'>
      <div className='w'>
        <h2>Ready to Automate Your Most Expensive Bottlenecks?</h2>
        <p className='lead'>
          Contact our AI engineering team today to audit your workflows and map
          your secure AI strategy. Whether you&apos;re in the USA or India, we
          sign an NDA before you share any documents.
        </p>
        <AiLeadForm
          selectLabel='Area of interest'
          selectOptions={[
            'Document processing',
            'AI agent / copilot',
            'System integration',
            'AI strategy & audit',
            'Not sure yet',
          ]}
          messagePlaceholder='Which workflow costs your team the most time?'
          submitLabel='Contact Our AI Experts'
          subject='ai-automation'
        />
        <div className='row'>
          <Link className='btn o' href='/portfolio/'>
            View AI Case Studies
          </Link>
        </div>
      </div>
    </section>
  </AiServiceShell>
);

export default AiAutomation;

export const getStaticProps: GetStaticProps = async () => ({
  props: { blogData: await fetchLatestBlogs(3) },
  revalidate: 3600,
});
