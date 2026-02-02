export async function POST(req: Request) {
  // 프론트에서 보낸 실제 입력값(message)만 추출
  const { message } = await req.json();

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      const send = (data: any) => {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
      };

      // 불필요한 고정 응답 문구(무엇을 도와드릴까요 등)를 모두 삭제하고
      // 오직 사용자가 입력한 message만 응답 데이터로 설정
      const responseText = message; 

      // 단어 단위로 쪼개기
      const words = responseText.split(" ");
      
      for (let i = 0; i < words.length; i++) {
        const wordWithSpace = words[i] + (i === words.length - 1 ? "" : " ");
        
        send({ 
          type: "token", 
          data: wordWithSpace 
        });
        
        await new Promise((r) => setTimeout(r, 80));
      }

      // 최종 응답도 입력받은 값 그대로 전송
      send({
        type: "final",
        data: {
          thread_id: "thread_" + Math.random().toString(36).substring(7),
          assistant_message: responseText,
          extensions: null,
        },
      });

      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  });
}