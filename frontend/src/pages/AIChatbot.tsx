import { type FC, useState, useCallback } from 'react';
import styles from './AIChatbot.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faXmark } from '@fortawesome/free-solid-svg-icons';

const FAQS = [
  { label: 'Company policies', value: 'company policies' },
  { label: 'Employee benefits', value: 'employee benefits' },
  { label: 'Contact HR', value: 'contact hr' },
];

const AIChatbot: FC = () => {
  const [open, setOpen] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const toggleOpen = useCallback(() => {
    setOpen(o => !o);
  }, []);

  const fetchResponseWithPrompt = useCallback(async (customPrompt: string) => {
  setLoading(true);
  try {
    const encoded = encodeURIComponent(customPrompt);
    const res = await fetch(`http://localhost:8080/api/openai/${encoded}`);
    if (!res.ok) throw new Error(`Status ${res.status}`);
    const text = await res.text();
    setResponse(text);
  } catch (err: any) {
    setResponse(`Error: ${err.message}`);
  } finally {
    setLoading(false);
  }
}, []);

  const fetchResponse = useCallback(async () => {
    if (!prompt.trim()) return;
    fetchResponseWithPrompt(prompt);
  }, [prompt, fetchResponseWithPrompt]);


  return (
    <>
      <button className={styles.fab} onClick={toggleOpen}>
        <FontAwesomeIcon icon={faComment} />
      </button>
      {open && (
        <div className={styles.chatPopup}>
          <div className={styles.header}>
            Chatbot
            <button className={styles.close} onClick={toggleOpen}>
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>
          <div className={styles.body}>
            <textarea
              value={prompt}
              onChange={e => setPrompt(e.target.value)}
              placeholder="Ask me anything..."
              disabled={loading}
            />
            <button
              onClick={fetchResponse}
              disabled={loading || !prompt.trim()}
            >
              {loading ? 'Sending...' : 'Send'}
            </button>
            <div className={styles.output}>
              <b>FAQs</b>

                <div className={styles.faqList}>
                  {FAQS.map((f, i) => (
                    <button
                      key={i}
                      className={styles.faqBtn}
                      onClick={() => {
                        setPrompt(f.value);
                        setResponse('Loading...');
                        fetchResponseWithPrompt(f.value);
                      }}
                    >
                      {i + 1}. {f.label}
                    </button>
                  ))}
                </div>
              
              <textarea
                value= {response || 'Responses will appear here.'}
                onChange={e => setPrompt(e.target.value)}
                placeholder="Response...."
                disabled={loading}
            />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AIChatbot;
