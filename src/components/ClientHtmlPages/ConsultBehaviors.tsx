import { useEffect } from 'react';

const ConsultBehaviors = () => {
  useEffect(() => {
    const root = document.querySelector('.nl-consult');
    if (!root) return;

    const answers: Array<number | null> = Array(6).fill(null);
    const results = [
      {
        max: 2,
        stage: 'exploring',
        title: 'Early stage: build the foundations first',
        text: "Your data, policies or systems need work before AI can pay off. An audit will show you what to fix first, so you don't spend money on a tool that can't work yet.",
      },
      {
        max: 4,
        stage: 'planning',
        title: 'Getting ready: pick the right first project',
        text: 'You have some foundations in place. A blueprint will identify your highest-return use case and the gaps to close before you build.',
      },
      {
        max: 6,
        stage: 'pilot',
        title: 'Ready to pilot',
        text: "You're in a strong position. The next step is a costed 4-week proof of concept that proves value on your real data before a full rollout.",
      },
    ];

    const onYn = (g: Element) => (e: Event) => {
      const b = (e.target as HTMLElement).closest('button');
      if (!b) return;
      g.querySelectorAll('button').forEach((x) =>
        x.setAttribute('aria-pressed', x === b ? 'true' : 'false')
      );
      const q = Number((g as HTMLElement).dataset.q);
      answers[q] = Number((b as HTMLElement).dataset.v);
      const done = answers.filter((v) => v !== null).length;
      const meter = root.querySelector('#meter') as HTMLElement | null;
      const progress = root.querySelector('#progress');
      if (meter) meter.style.width = `${(done / 6) * 100}%`;
      if (progress) progress.textContent = `${done} of 6 answered`;
      if (done === 6) {
        const s = answers.reduce<number>((a, v) => a + (v || 0), 0);
        const r = results.find((item) => s <= item.max);
        if (!r) return;
        const rScore = root.querySelector('#rScore');
        const rTitle = root.querySelector('#rTitle');
        const rText = root.querySelector('#rText');
        const rBtn = root.querySelector('#rBtn') as HTMLElement | null;
        const result = root.querySelector('#result');
        if (rScore) rScore.textContent = `Your score: ${s} of 6`;
        if (rTitle) rTitle.textContent = r.title;
        if (rText) rText.textContent = r.text;
        if (rBtn) rBtn.dataset.interest = r.stage;
        result?.classList.add('show');
      }
    };

    const ynCleanups: Array<() => void> = [];
    root.querySelectorAll('.yn').forEach((g) => {
      const handler = onYn(g);
      g.addEventListener('click', handler);
      ynCleanups.push(() => g.removeEventListener('click', handler));
    });

    const onInterest = (e: Event) => {
      const a = (e.target as HTMLElement).closest(
        '[data-interest]'
      ) as HTMLElement | null;
      if (!a) return;
      const sel = document.getElementById('stage') as HTMLSelectElement | null;
      if (sel && a.dataset.interest) sel.value = a.dataset.interest;
    };
    root.addEventListener('click', onInterest);

    const tabs = Array.from(root.querySelectorAll('[role=tab]'));
    const select = (t: Element) => {
      tabs.forEach((x) => {
        const on = x === t;
        x.setAttribute('aria-selected', String(on));
        (x as HTMLElement).tabIndex = on ? 0 : -1;
        const panel = document.getElementById(
          x.getAttribute('aria-controls') || ''
        );
        if (panel) panel.hidden = !on;
      });
    };
    const tabCleanups: Array<() => void> = [];
    tabs.forEach((t, i) => {
      const click = () => select(t);
      const key = (e: Event) => {
        const ke = e as KeyboardEvent;
        let n: Element | null = null;
        if (['ArrowDown', 'ArrowRight'].includes(ke.key))
          n = tabs[(i + 1) % tabs.length];
        if (['ArrowUp', 'ArrowLeft'].includes(ke.key))
          n = tabs[(i - 1 + tabs.length) % tabs.length];
        if (n) {
          ke.preventDefault();
          select(n);
          (n as HTMLElement).focus();
        }
      };
      t.addEventListener('click', click);
      t.addEventListener('keydown', key);
      tabCleanups.push(() => {
        t.removeEventListener('click', click);
        t.removeEventListener('keydown', key);
      });
    });

    return () => {
      ynCleanups.forEach((fn) => fn());
      root.removeEventListener('click', onInterest);
      tabCleanups.forEach((fn) => fn());
    };
  }, []);

  return null;
};

export default ConsultBehaviors;
