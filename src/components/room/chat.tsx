function ChatBubble({ text }: { text: string }) {
  return (
    <div className="flex justify-start">
      <div className="relative px-4 py-2 rounded-2xl max-w-xs break-words whitespace-pre-wrap bg-secondary-foreground text-secondary">
        {text}
      </div>
    </div>
  );
}
export default ChatBubble;
