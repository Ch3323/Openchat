function ChatBubble({ text, image_url }: { text: string; image_url: string }) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const parts = text.split(urlRegex);

  return (
    <div className="flex justify-start">
      <div className="relative px-4 py-2 rounded-2xl max-w-xs break-words whitespace-pre-wrap bg-secondary-foreground text-secondary">
        {image_url !== '' ? <img src={image_url} /> : ''}
        {parts.map((part, i) =>
          urlRegex.test(part) ? (
            <a
              key={i}
              href={part}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 underline"
            >
              {part}
            </a>
          ) : (
            part
          ),
        )}
      </div>
    </div>
  );
}
export default ChatBubble;
