export async function generatePromptDesign({ personality, tone, purpose }) {
  const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY

  const response = await fetch('/api/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      system:
        '당신은 AI 캐릭터 설계 전문가입니다. 주어진 캐릭터 설정(성격, 말투, 목적)을 바탕으로, 해당 캐릭터를 구현하기 위한 시스템 프롬프트와 예시 대화를 설계해주세요. 한국어로 답변하세요. 마크다운 형식으로 구조화해서 작성하세요.',
      messages: [
        {
          role: 'user',
          content: `다음 설정의 AI 캐릭터를 설계해주세요.\n\n- 성격: ${personality}\n- 말투: ${tone}\n- 목적: ${purpose}\n\n시스템 프롬프트와 예시 대화 2개를 포함해주세요.`,
        },
      ],
    }),
  })

  if (!response.ok) {
    throw new Error(`API 호출 실패: ${response.status}`)
  }

  const data = await response.json()
  return data.content[0].text
}
