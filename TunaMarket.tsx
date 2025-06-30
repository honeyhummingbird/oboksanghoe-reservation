
// 오복상회 참치 예약 사이트 - MVP 버전
// --------------------------------------------------
// 구성 요소:
// 1. 상품 리스트: Google Sheets에서 정의하거나 하드코딩된 상품 목록 사용
// 2. 예약 시스템: 품번 클릭 → 이름, 연락처, 수령 방식 입력 → 예약 확정 처리
// 3. 중복 방지: 이미 예약된 항목은 버튼 비활성화

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// 임시 상품 리스트 - 추후 Google Sheets API 연동으로 대체 가능
const products = [
  { id: 1, name: "01번 뱃살+등살", weight: "850g + 1360g", price: 850 * 7.5 + 1360 * 3.5 },
  { id: 2, name: "02번 뱃살+등살", weight: "610g + 1230g", price: 610 * 7.5 + 1230 * 3.5 },
  // ...중략: 실제 23개 전체 입력
];

export default function TunaMarket() {
  const [reserved, setReserved] = useState<number | null>(null); // 선택한 상품 ID
  const [buyerInfo, setBuyerInfo] = useState({ name: "", phone: "", method: "" }); // 예약자 입력값 상태

  // 예약 버튼 클릭 시 호출되는 함수
  const handleReserve = (id: number) => {
    setReserved(id);
  };

  return (
    <div className="grid gap-4 p-4">
      {/* 상단 배너 이미지 - Google Sheets 연동 시 목록 위에 출력 가능 */}
      <img src="/banner-tuna.png" alt="판매 리스트" className="rounded-xl shadow" />

      {/* 상품 카드 UI 출력 영역 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map((item) => (
          <Card key={item.id} className={reserved === item.id ? "border-2 border-green-500" : ""}>
            <CardContent className="p-4">
              <h2 className="text-xl font-bold mb-2">{item.name}</h2>
              <p>중량: {item.weight}</p>
              <p>가격: {item.price.toLocaleString()}원</p>
              {/* 이미 예약되면 버튼 비활성화 */}
              <Button className="mt-2 w-full" onClick={() => handleReserve(item.id)} disabled={reserved !== null}>
                {reserved === item.id ? "예약됨" : "예약하기"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 예약자 정보 입력창 - 품번 클릭 시 노출 */}
      {reserved && (
        <div className="p-4 bg-gray-100 rounded-xl mt-4">
          <h3 className="text-lg font-semibold mb-2">예약자 정보 입력</h3>

          {/* 성함 입력 */}
          <Input
            className="mb-2"
            placeholder="성함"
            value={buyerInfo.name}
            onChange={(e) => setBuyerInfo({ ...buyerInfo, name: e.target.value })}
          />

          {/* 전화번호 입력 */}
          <Input
            className="mb-2"
            placeholder="전화번호"
            value={buyerInfo.phone}
            onChange={(e) => setBuyerInfo({ ...buyerInfo, phone: e.target.value })}
          />

          {/* 수령 방식 (퀵, 방문, 보관 등) */}
          <Input
            className="mb-2"
            placeholder="수령 방식 (예: 방문, 퀵, 보관)"
            value={buyerInfo.method}
            onChange={(e) => setBuyerInfo({ ...buyerInfo, method: e.target.value })}
          />

          {/* 기타 요청사항 또는 주소 */}
          <Textarea placeholder="요청사항 또는 주소 입력" className="mb-2" />

          {/* 예약 확정 버튼 (데이터는 추후 시트에 전송 처리) */}
          <Button className="w-full">예약 확정 및 입금 안내 받기</Button>
        </div>
      )}
    </div>
  );
}

// --------------------------------------------------
// 📌 향후 개선 방향성 제안
// 1. Google Sheets API 연동 → 실시간 상품 등록 및 예약 결과 저장
// 2. 예약자 정보 전송 시 중복 체크 → 이미 예약된 번호는 자동 비활성화
// 3. 관리자 모드 추가 → 입금 여부 확인, 예약자 필터링
// 4. 예약 확정 후 카카오 알림톡 또는 문자 발송 연동
// 5. Google Form 대체용으로도 사용 가능하게 경량화 버전 제작
// 6. 반응형 UI 개선 및 관리자 대시보드 추가

// © 2025 오복상회. 참치 예약 플랫폼
