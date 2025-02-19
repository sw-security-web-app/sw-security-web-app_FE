export const mockMessages = Array.from({ length: 100 }, (_, i) => ({
  sender: i % 2 === 0 ? ("AI" as const) : ("USER" as const), // 리터럴 타입 고정
  text: `테스트 메시지 ${100 - i}`,
}));
