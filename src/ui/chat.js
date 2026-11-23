// Текстовый чат комнаты: лента слева внизу (старые сообщения тают), поле ввода по Enter/T.
// Текст вставляется только как текст (textContent) — никакого HTML от других игроков.
export class Chat {
  constructor(onSend) {
    this.onSend = onSend;
    this.root = document.getElementById('chat');
    this.log = document.getElementById('chat-log');
    this.input = document.getElementById('chat-input');
    this.isOpen = false;
    this.input.addEventListener('keydown', (e) => {
      e.stopPropagation();
      if (e.key === 'Enter') {
        const text = this.input.value.trim();
        if (text) this.onSend(text);
        this.close();
        e.preventDefault();
      } else if (e.key === 'Escape') {
        this.close();
        e.preventDefault();
      }
    });
    this.input.addEventListener('keyup', (e) => e.stopPropagation());
    this.input.addEventListener('blur', () => { if (this.isOpen) this.close(); });
  }

  show(on) { this.root.classList.toggle('hidden', !on); }

  open() {
    if (this.isOpen) return;
    this.isOpen = true;
    this.root.classList.add('open');
    this.input.value = '';
    this.input.focus({ preventScroll: true });
  }

  close() {
    if (!this.isOpen) return;
    this.isOpen = false;
    this.root.classList.remove('open');
    this.input.blur();
  }

  // kind: '' — игрок, 'me' — я, 'sys' — служебное
  add(nick, text, kind = '') {
    const line = document.createElement('div');
    line.className = 'line ' + kind;
    if (nick) {
      const b = document.createElement('b');
      b.textContent = nick + ': ';
      line.appendChild(b);
    }
    line.appendChild(document.createTextNode(text));
    this.log.appendChild(line);
    while (this.log.children.length > 40) this.log.firstChild.remove();
    this.log.scrollTop = this.log.scrollHeight;
    // через 12 секунд строка тает (при открытом чате видно всё)
    setTimeout(() => line.classList.add('old'), 12000);
  }
}
