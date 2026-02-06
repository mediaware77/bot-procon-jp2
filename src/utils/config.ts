// Configuration utility for chat appearance settings
export interface ChatConfig {
  height: string;
  width: string;
  fontSizeUser: string;
  fontSizeBot: string;
  fontSizeBotHeaders: string;
}

// Default values for chat configuration
const defaultConfig: ChatConfig = {
  height: '460px',
  width: '320px',
  fontSizeUser: '16px',
  fontSizeBot: '15px',
  fontSizeBotHeaders: '18px'
};

// Get chat configuration from environment variables with fallbacks
export const getChatConfig = (): ChatConfig => {
  return {
    height: import.meta.env.VITE_CHAT_HEIGHT || defaultConfig.height,
    width: import.meta.env.VITE_CHAT_WIDTH || defaultConfig.width,
    fontSizeUser: import.meta.env.VITE_CHAT_FONT_SIZE_USER || defaultConfig.fontSizeUser,
    fontSizeBot: import.meta.env.VITE_CHAT_FONT_SIZE_BOT || defaultConfig.fontSizeBot,
    fontSizeBotHeaders: import.meta.env.VITE_CHAT_FONT_SIZE_BOT_HEADERS || defaultConfig.fontSizeBotHeaders
  };
};

// Helper function to apply CSS custom properties
export const applyChatStyles = (config: ChatConfig): void => {
  const root = document.documentElement;
  root.style.setProperty('--chat-height', config.height);
  root.style.setProperty('--chat-width', config.width);
  root.style.setProperty('--chat-font-size-user', config.fontSizeUser);
  root.style.setProperty('--chat-font-size-bot', config.fontSizeBot);
  root.style.setProperty('--chat-font-size-bot-headers', config.fontSizeBotHeaders);
};