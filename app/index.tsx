import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList,ImageBackground, StyleSheet } from 'react-native';

const getEmoji = (text: string) => {
  if (/sad|down|depressed|bad/i.test(text)) return '😔';
  if (/happy|joy|excited|great/i.test(text)) return '😊';
  if (/angry|mad|frustrated/i.test(text)) return '😡';
  if (/love|heart|miss/i.test(text)) return '💖';
  return '📝';
};

const generateReply = (text: string) => {
  const lower = text.toLowerCase();

  if (/(heartbreak|broken|alone|numb|worthless|cry)/.test(lower)) {
    return "I hear your heart, even in silence. It's okay to feel shattered — you don’t have to hold it all together. Let the pain pass through gently. Healing doesn’t mean forgetting, it means growing around the hurt. 💔";
  }

  if (/(overthinking|anxiety|pressure|panic)/.test(lower)) {
    return "Your mind feels heavy right now — it’s okay. You don’t have to solve everything at once. Breathe slowly. You're allowed to pause, to not be okay. You’re not alone in this storm. 🌧️";
  }

  if (/(miss|missing|absence|longing)/.test(lower)) {
    return "Missing someone can echo quietly in everything. It’s a tender ache — it means you loved deeply. Hold on to the warmth they brought. It’s okay to feel both love and loss. 💭";
  }

  if (/(tired|burnt out|exhausted|fatigued)/.test(lower)) {
    return "You've been carrying so much. It's okay to rest. Your worth isn’t measured by how much you do — you’re already enough. Let yourself breathe. 🌙";
  }

  if (/(angry|frustrated|rage|annoyed)/.test(lower)) {
    return "Anger is a valid feeling — it shows you care, that something matters. You don’t have to suppress it. Acknowledge it. Understand it. You are allowed to feel. 🔥";
  }

  if (/(love|care|affection|bond)/.test(lower)) {
    return "Love is powerful — it connects souls in ways words often can't. Whether it's returned or not, your ability to feel so deeply is beautiful. 💕";
  }

  if (/(happy|joy|peace|smile)/.test(lower)) {
    return "That’s wonderful! Savor the light moments — they’re precious and healing. Let them fill your heart and carry you forward. ☀️";
  }

  if (/(hope|healing|trying|getting better)/.test(lower)) {
    return "Hope is a quiet light that never really dies. Healing is not linear, and every step you take matters — even the ones where you simply breathe and stay. 🌱";
  }

  return "Thank you for opening up. This space will always be here for you — to listen, to hold, to feel. Every word you share matters. 🌸";
};

export default function FeelTalk() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ type: 'user' | 'reply'; text: string }[]>([]);

  const handleSend = () => {
    if (!input.trim()) return;

    const reply = generateReply(input);
    const emoji = getEmoji(input);

    setMessages([
      ...messages,
      { type: 'user', text: `${emoji} ${input.trim()}` },
      { type: 'reply', text: reply },
    ]);
    setInput('');
  };

 return (
  <View style={[styles.container, {
    backgroundImage: 'url(./assets/aesthetic_bear_keyboard.jpeg)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  }]}>
    <Text style={styles.title}>FeelTalk</Text>
    <Text style={styles.subtitle}>A soft space for your thoughts and emotions.</Text>

    <FlatList
      style={styles.chat}
      data={messages}
      keyExtractor={(_, index) => index.toString()}
      renderItem={({ item }) => (
        <View style={[
          styles.messageBubble,
          item.type === 'user' ? styles.userMsg : styles.replyMsg
        ]}>
          <Text style={styles.messageText}>{item.text}</Text>
        </View>
      )}
    />

    <View style={styles.inputRow}>
      <TextInput
        style={styles.input}
        placeholder="How are you feeling today?"
        placeholderTextColor="#ccc"
        value={input}
        onChangeText={setInput}
      />
      <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
        <Text style={styles.sendButtonText}>➤</Text>
      </TouchableOpacity>
    </View>
  </View>
);


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3e5d8', // light mocha
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  background: {
  flex: 1,
  width: '100%',
  height: '100%',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#5e3c2c', // rich chocolate
    textAlign: 'center',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 15,
    color: '#8d6e63', // soft brown
    textAlign: 'center',
    marginBottom: 20,
  },
  chat: {
    flex: 1,
    marginBottom: 20,
  },
  messageBubble: {
    padding: 14,
    borderRadius: 16,
    marginVertical: 6,
    maxWidth: '80%',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  userMsg: {
    alignSelf: 'flex-end',
    backgroundColor: '#d7ccc8', // light warm brown
  },
  replyMsg: {
    alignSelf: 'flex-start',
    backgroundColor: '#efebe9', // light creamy background
  },
  messageText: {
    fontSize: 16,
    color: '#3e2723', // dark chocolate text
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 20,
  },
  input: {
    flex: 1,
    borderColor: '#bcaaa4',
    backgroundColor: '#5e3c2c',
    borderWidth: 1,
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 18,
    fontSize: 16,
    color: '#ccc', // medium chocolate text
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: '#a1887f', // mocha/choco tone
    padding: 12,
    borderRadius: 25,
  },
  sendButtonText: {
    fontSize: 18,
    color: '#fff',
  },
});
