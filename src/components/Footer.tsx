import type { PublicPage } from '../lib/types';

type FooterProps = {
  setActivePage: (p: PublicPage) => void;
};

export function Footer({ setActivePage }: FooterProps) {
  return (
    <footer className="footer">
      <div className="footer-brand">
        <div className="brand-mark" style={{ width:'2rem', height:'2rem', fontSize:'.7rem', display:'grid', placeItems:'center', borderRadius:'.5rem', background:'linear-gradient(135deg,#00C2A8,#0ea5e9)', color:'#0B1B3E', fontWeight:800 }}>K&A</div>
        <span><strong>Kutlwano & Associate</strong> · Professional Portal</span>
      </div>
      <nav className="footer-links" aria-label="Footer navigation">
        <button onClick={() => setActivePage('privacy')}>Privacy</button>
        <button onClick={() => setActivePage('security')}>Security</button>
        <button onClick={() => setActivePage('support')}>Support</button>
        <button onClick={() => setActivePage('install')}>Install app</button>
      </nav>
      <span style={{ fontSize:'.78rem' }}>© {new Date().getFullYear()} Kutlwano & Associate. All rights reserved.</span>
    </footer>
  );
}
