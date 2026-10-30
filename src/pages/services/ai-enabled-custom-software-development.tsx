import type { GetStaticProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import AiLeadForm from '../../components/AiServicePages/AiLeadForm';
import AiServiceShell from '../../components/AiServicePages/AiServiceShell';
import BlogSection from '../../components/BlogSection';
import { BlogData } from '../../types';
import { fetchLatestBlogs } from '../../utils/fetchBlogdata';
import cert1 from '../../../assets/certificates/1.png';
import cert2 from '../../../assets/certificates/2.png';
import cert3 from '../../../assets/certificates/3.png';

const TITLE = 'AI-Enabled Custom Software Development Services | Nextloop';
const DESC =
  'We use AI across design, coding and testing to build custom software faster, and add AI features like search, assistants and automation into the products we deliver.';

const faqs = [
  {
    q: 'What is AI-enabled custom software development?',
    a: 'It is custom software built with AI tools across planning, coding and testing, often with AI features inside the product itself. Engineers stay responsible for architecture, code review and quality. The result is software tailored to your business, with less repetitive manual work.',
  },
  {
    q: 'What is the difference between AI-assisted, AI-enabled and AI-native software?',
    a: 'In AI-assisted development, developers use tools like code suggestions for parts of the work. AI-enabled means AI is used across the delivery process and can be built into the product. AI-native means the product and the process are designed around AI from the start. We help you choose the level that fits your goals and risk.',
  },
  {
    q: 'Who owns the code if AI tools are used to write it?',
    a: 'You do. Under our contract, all source code and IP we create for you transfer to you, including AI-assisted code. Our engineers review AI-generated code before it is merged.',
  },
  {
    q: 'Is my data safe when AI tools are used?',
    a: "We handle client code and data under ISO 27001-certified security processes. We choose AI tools and deployment options to fit your privacy and compliance needs. We don't share your confidential data without your approval.",
  },
  {
    q: 'Does AI make software development faster or cheaper?',
    a: "AI speeds up repetitive work such as boilerplate code, test cases and documentation. How much it saves depends on the project, so we don't promise a fixed percentage. During the consultation, we'll show you where AI helps in your project.",
  },
  {
    q: 'How much does custom software development cost?',
    a: 'The cost varies based on project complexity, feature requirements, and the chosen tech stack. We offer flexible pricing options, including Fixed Price and Time & Material models, to align precisely with your budget and business goals.',
  },
  {
    q: 'How long does it take to build custom software?',
    a: 'A typical custom software project takes between 3 to 9 months to complete. Simple applications may launch in 8 to 12 weeks, while complex enterprise systems require 6 months or more depending on necessary integrations.',
  },
  {
    q: 'Why choose custom software over off-the-shelf software?',
    a: 'Custom software is built specifically for your unique workflows, ensuring seamless scalability and zero ongoing licensing fees. Unlike off-the-shelf products, it integrates flawlessly with your existing corporate systems without forcing you to change how your business operates. Custom software can also include AI features built for your workflows.',
  },
  {
    q: 'Will I own the intellectual property and source code?',
    a: 'You own 100% of the intellectual property and source code. Upon project completion and final delivery, Nextloop Technologies transfers all proprietary rights directly to your business, ensuring total control over your digital assets.',
  },
  {
    q: 'What engagement models do you offer?',
    a: 'We provide flexible engagement models tailored to your needs, including fully dedicated development teams, staff augmentation, and project-based outsourcing. This allows you to scale resources up or down while maintaining complete visibility over the development cycle.',
  },
];

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'AI-Enabled Custom Software Development',
    provider: { '@type': 'Organization', name: 'Nextloop Technologies' },
    areaServed: ['India', 'United States'],
    url: 'https://www.nextlooptechnologies.com/services/ai-enabled-custom-software-development/',
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

const AiEnabledCustomSoftware: React.FC<{ blogData: BlogData[] }> = ({
  blogData,
}) => (
  <AiServiceShell title={TITLE} description={DESC} variant='v2' jsonLd={jsonLd}>
    <div className='hero'>
      <div className='w'>
        <div>
          <h1>AI-Enabled Custom Software Development Services</h1>
          <p>
            We use AI across design, coding and testing to build custom software
            faster and more reliably. We also build AI features like search,
            assistants and automation into the products we deliver. Our
            engineers review every release before it ships.
          </p>
          <div className='row'>
            <a className='btn' href='#cta'>
              Talk to Our Team
            </a>
            <Link className='btn o' href='/portfolio/'>
              View Our Work
            </Link>
          </div>
          <p className='tr'>CMMI Level 3 · ISO 27001 · ISO 9001:2015</p>
        </div>
        <div className='panel'>
          <div>
            <b>Design</b>
            <span>AI explores options, engineers decide</span>
          </div>
          <div>
            <b>Coding</b>
            <span>AI suggests, engineers review every change</span>
          </div>
          <div>
            <b>Testing</b>
            <span>AI drafts cases, engineers sign off</span>
          </div>
          <div>
            <b>In your product</b>
            <span>Search, assistants and automation</span>
          </div>
        </div>
      </div>
    </div>

    <section className='cream'>
      <div className='w'>
        <h2>What Is AI-Enabled Custom Software Development?</h2>
        <p className='lead'>
          AI-enabled custom software development means using AI tools to speed
          up planning, coding and testing, and adding AI capabilities to the
          software itself. Experienced engineers stay responsible for
          architecture, review and quality.
        </p>
        <div className='tw'>
          <table>
            <thead>
              <tr>
                <th> </th>
                <th>Traditional</th>
                <th>AI-assisted</th>
                <th>AI-enabled</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>How code is written</td>
                <td>Written manually by developers</td>
                <td>
                  Developers use AI code suggestions for parts of the work
                </td>
                <td>
                  AI supports coding across the project, with every change
                  reviewed
                </td>
              </tr>
              <tr>
                <td>How testing is done</td>
                <td>Manual and scripted test cases</td>
                <td>AI helps draft some test cases</td>
                <td>
                  AI generates test cases and edge cases across the release
                  cycle
                </td>
              </tr>
              <tr>
                <td>AI in the product</td>
                <td>None</td>
                <td>Usually none</td>
                <td>AI features built in where they add value</td>
              </tr>
              <tr>
                <td>Human review</td>
                <td>Peer review</td>
                <td>Developer reviews AI output</td>
                <td>Engineers review code, tests and releases</td>
              </tr>
              <tr>
                <td>Best for</td>
                <td>Stable, well-understood systems</td>
                <td>Teams wanting a faster developer workflow</td>
                <td>Products that need faster delivery and AI features</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className='fn'>
          AI-native goes further: AI is part of every phase and core to the
          product&apos;s design. We help teams move toward it when it fits.
        </p>
      </div>
    </section>

    <section>
      <div className='w'>
        <h2>Our Custom Software Development Services</h2>
        <p className='lead'>
          Pick one service or combine several. Each one can include AI where it
          helps.
        </p>
        <div className='svc'>
          <div>
            <i>A</i>
            <h3>Enterprise Software Development</h3>
            <p>
              Nextloop builds secure digital foundations to streamline complex
              corporate workflows. With expert java software development
              services, our team creates scalable, agile internal systems that
              handle massive business data across global networks effortlessly
              and without disruption. We add AI where it fits, such as smarter
              search, reporting and workflow automation inside your enterprise
              systems.
            </p>
          </div>
          <div>
            <i>B</i>
            <h3>Web &amp; SaaS Application Development</h3>
            <p>
              Delivering high-speed digital experiences has always been
              Nextloop&apos;s core focus. Using specialized React JS development
              services, we design responsive web platforms with intuitive
              interfaces and powerful backend architectures, ensuring a seamless
              user journey across all modern browsers. User-centric design is
              part of every build, so the product is easy to use from the first
              release.
            </p>
          </div>
          <div>
            <i>C</i>
            <h3>AI-Enabled Product Development</h3>
            <p>
              AI features added to new or existing software, from document
              Q&amp;A to assistants and predictions.
            </p>
          </div>
          <div>
            <i>D</i>
            <h3>AI Agents &amp; Workflow Automation</h3>
            <p>
              Assistants that handle repetitive business tasks across your
              systems.
            </p>
          </div>
          <div>
            <i>E</i>
            <h3>Legacy Application Modernization</h3>
            <p>
              AI-assisted code analysis and migration to move old applications
              onto a modern stack.
            </p>
          </div>
          <div>
            <i>F</i>
            <h3>MVP Development</h3>
            <p>
              Faster prototypes for startups, so you can test your idea with
              real users sooner.{' '}
              <Link className='inline' href='/services/mvp-development/'>
                See MVP development
              </Link>
            </p>
          </div>
        </div>
        <div className='row'>
          <a className='btn' href='#cta'>
            Discuss Your Project
          </a>
        </div>
      </div>
    </section>

    <section className='cream'>
      <div className='w'>
        <h2>How We Build Software With AI</h2>
        <p className='lead'>
          AI speeds up the repetitive work. Decisions, reviews and
          accountability stay with people.
        </p>
        <ol className='tl step'>
          <li>
            <h3>Discovery &amp; Requirements</h3>
            <p>
              <b>AI helps with:</b> summarising inputs, drafting user stories.
            </p>
            <em>
              <b>Our engineers:</b> validate scope with you.
            </em>
          </li>
          <li>
            <h3>Design &amp; Architecture</h3>
            <p>
              <b>AI helps with:</b> exploring UI options, documenting decisions.
            </p>
            <em>
              <b>Our engineers:</b> own architecture, scalability and security.
            </em>
          </li>
          <li>
            <h3>Development</h3>
            <p>
              <b>AI helps with:</b> code suggestions, boilerplate, refactoring.
            </p>
            <em>
              <b>Our engineers:</b> review every change before merge.
            </em>
          </li>
          <li>
            <h3>Testing &amp; QA</h3>
            <p>
              <b>AI helps with:</b> generating test cases, finding edge cases.
            </p>
            <em>
              <b>Our engineers:</b> sign off quality and security checks.
            </em>
          </li>
          <li>
            <h3>Deployment &amp; Maintenance</h3>
            <p>
              <b>AI helps with:</b> monitoring, log analysis, documentation.
            </p>
            <em>
              <b>Our engineers:</b> release, support and improvements.
            </em>
          </li>
        </ol>
      </div>
    </section>

    <section>
      <div className='w'>
        <h2>AI Capabilities We Build Into Your Software</h2>
        <p className='lead'>
          Add AI to the parts of your product where it saves your team or
          customers real time.
        </p>
        <div className='why'>
          <div>
            <h3>Smart Search &amp; Document Q&amp;A</h3>
            <p>Staff find answers across manuals, policies and records.</p>
          </div>
          <div>
            <h3>Document Processing</h3>
            <p>Extract data from invoices, forms and reports.</p>
          </div>
          <div>
            <h3>AI Assistants &amp; Chatbots</h3>
            <p>Customer support and internal help desks.</p>
          </div>
          <div>
            <h3>AI Agents</h3>
            <p>Multi-step tasks across your systems.</p>
          </div>
          <div>
            <h3>Predictive Analytics</h3>
            <p>Forecasts and alerts from your own data.</p>
          </div>
        </div>
        <div className='row'>
          <a className='btn' href='#cta'>
            See How AI Fits Your Product
          </a>
          <Link className='btn o' href='/services/ai-ml/'>
            Explore our AI &amp; ML services
          </Link>
        </div>
      </div>
    </section>

    <section className='dark'>
      <div className='w sec'>
        <div>
          <h2>Responsible AI: Security, IP and Data Protection</h2>
          <p className='lead' style={{ marginBottom: 0 }}>
            AI should make your project safer to deliver, not riskier. These
            terms apply to every engagement.
          </p>
        </div>
        <div>
          <div className='it'>
            <h3>You own the code</h3>
            <p>
              All source code and IP transfer to you, including AI-assisted
              code.
            </p>
          </div>
          <div className='it'>
            <h3>Your data stays protected</h3>
            <p>
              Client code and data are handled under ISO 27001-certified
              processes. AI tools are chosen to fit your data and privacy needs.
            </p>
          </div>
          <div className='it'>
            <h3>No lock-in to one AI model</h3>
            <p>
              We choose models and providers that suit your use case and budget.
            </p>
          </div>
          <div className='it'>
            <h3>Predictable AI running costs</h3>
            <p>We plan the usage costs of AI features before launch.</p>
          </div>
        </div>
      </div>
    </section>

    <section>
      <div className='w'>
        <h2>Technology Stack for AI-Enabled Software</h2>
        <p className='lead'>
          We pick the stack to fit your product, team and budget, not the other
          way round.
        </p>
        <div className='nl-cards'>
          <div className='nl-card'>
            <h3>Frontend</h3>
            <div className='nl-chips'>
              <span>React</span>
              <span>Next.js</span>
              <span>Angular</span>
              <span>Vue.js</span>
              <span>React Native</span>
            </div>
          </div>
          <div className='nl-card'>
            <h3>Backend</h3>
            <div className='nl-chips'>
              <span>Node.js</span>
              <span>Python</span>
              <span>Java</span>
              <span>.NET</span>
              <span>PHP</span>
            </div>
          </div>
          <div className='nl-card'>
            <h3>AI &amp; machine learning</h3>
            <div className='nl-chips'>
              <span>OpenAI</span>
              <span>Anthropic Claude</span>
              <span>Meta Llama</span>
              <span>LangChain</span>
              <span>RAG pipelines</span>
              <span>Vector databases</span>
            </div>
          </div>
          <div className='nl-card'>
            <h3>Data</h3>
            <div className='nl-chips'>
              <span>PostgreSQL</span>
              <span>MongoDB</span>
              <span>MySQL</span>
              <span>Redis</span>
              <span>Pinecone</span>
            </div>
          </div>
          <div className='nl-card'>
            <h3>Cloud &amp; DevOps</h3>
            <div className='nl-chips'>
              <span>AWS</span>
              <span>Microsoft Azure</span>
              <span>Google Cloud</span>
              <span>Docker</span>
              <span>Kubernetes</span>
              <span>CI/CD</span>
            </div>
          </div>
          <div className='nl-card'>
            <h3>Testing &amp; AI tooling</h3>
            <div className='nl-chips'>
              <span>Selenium</span>
              <span>Jest</span>
              <span>Cypress</span>
              <span>AI code assistants</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className='cream'>
      <div className='w'>
        <h2>Why Choose Nextloop</h2>
        <p className='lead'>
          A delivery partner that uses AI with care and stays accountable after
          launch.
        </p>
        <div className='nl-why-split'>
          <div className='nl-why-list'>
            <div>
              <h3>Flexible engagement models</h3>
              <p>Fixed price, dedicated team, or time and material.</p>
            </div>
            <div>
              <h3>AI where it helps</h3>
              <p>Used for specific tasks, not everywhere.</p>
            </div>
            <div>
              <h3>IP and data protection by default</h3>
              <p>
                Your code, your IP and your data are protected from day one.
              </p>
            </div>
            <div>
              <h3>Certified processes</h3>
              <p>CMMI Level 3, ISO 27001 and ISO 9001:2015.</p>
            </div>
            <div>
              <h3>Support after launch</h3>
              <p>Maintenance, upgrades and scaling.</p>
            </div>
          </div>
          <div className='nl-why-certs'>
            <div>
              <Image src={cert3} alt='CMMI Level 3' height={88} width={88} />
              <div>
                <b>CMMI Level 3</b>
                <span>Software process maturity</span>
              </div>
            </div>
            <div>
              <Image src={cert2} alt='ISO 27001' height={88} width={88} />
              <div>
                <b>ISO 27001</b>
                <span>Information security</span>
              </div>
            </div>
            <div>
              <Image src={cert1} alt='ISO 9001:2015' height={88} width={88} />
              <div>
                <b>ISO 9001:2015</b>
                <span>Quality management</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section>
      <div className='w'>
        <h2>Industries We Serve</h2>
        <p className='lead'>
          AI use cases we plan and build with teams in these sectors.
        </p>
        <div className='nl-ind-grid'>
          <div className='nl-ind-card'>
            <h3>Oil &amp; Gas</h3>
            <small>Equipment and maintenance reporting</small>
            <Link className='btn o' href='/domain/oil-and-gas/'>
              Explore Oil &amp; Gas
            </Link>
          </div>
          <div className='nl-ind-card'>
            <h3>Food &amp; Beverages</h3>
            <small>Demand forecasting</small>
            <Link className='btn o' href='/domain/food-and-beverages/'>
              Explore Food &amp; Beverages
            </Link>
          </div>
          <div className='nl-ind-card'>
            <h3>Healthcare</h3>
            <small>Document and records processing</small>
            <Link className='btn o' href='/domain/healthcare/'>
              Explore Healthcare
            </Link>
          </div>
          <div className='nl-ind-card'>
            <h3>Fintech</h3>
            <small>Fraud signals, KYC document checks</small>
            <Link className='btn o' href='/domain/fintech/'>
              Explore Fintech
            </Link>
          </div>
        </div>
      </div>
    </section>

    <section className='cream'>
      <div className='w'>
        <h2>Our Work</h2>
        <p className='lead'>
          See how we deliver software for teams across industries.
        </p>
        <div className='row'>
          <Link className='btn' href='/portfolio/'>
            See Our Portfolio
          </Link>
        </div>
      </div>
    </section>

    <section>
      <div className='w'>
        <h2>Frequently Asked Questions</h2>
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
        <h2>Ready to Build Software That Works Smarter?</h2>
        <p className='lead'>
          Tell us what you want to build. We&apos;ll suggest where AI helps,
          where it doesn&apos;t, and how to get started.
        </p>
        <AiLeadForm
          selectLabel='Project type'
          selectOptions={[
            'Enterprise software',
            'Web / SaaS',
            'AI features',
            'Modernization',
            'MVP',
          ]}
          messagePlaceholder='What do you want to build?'
          submitLabel='Book a Free Consultation'
          subject='ai-enabled-custom-software'
        />
      </div>
    </section>
  </AiServiceShell>
);

export default AiEnabledCustomSoftware;

export const getStaticProps: GetStaticProps = async () => ({
  props: { blogData: await fetchLatestBlogs(3) },
  revalidate: 3600,
});
