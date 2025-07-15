import { type FC, useState, useCallback } from 'react';
import styles from './AIChatbot.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faXmark } from '@fortawesome/free-solid-svg-icons';


const AIChatbot: FC = () => {
  const [open, setOpen] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const toggleOpen = useCallback(() => {
    setOpen(o => !o);
  }, []);

  const fetchResponse = useCallback(async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setResponse('Loading...');
    try {
      const encoded = encodeURIComponent(prompt);
      const res = await fetch(`http://localhost:8080/api/openai/${encoded}`);
      if (!res.ok) throw new Error(`Status ${res.status}`);
      const text = await res.text();
      setResponse(text);
    } catch (err: any) {
      setResponse(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }, [prompt]);

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
              <ul>
                <li><a href="https://nology.io/about-us/" target='_blank'>1.Company policies</a></li>
                <li><a href="https://nology.io/become-a-developer/" target='_blank'>2.Employee Benefits</a></li>
                <li><a href="https://nology.io/contact/" target='_blank'>3.Contact HR</a></li>
              </ul>
              
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
