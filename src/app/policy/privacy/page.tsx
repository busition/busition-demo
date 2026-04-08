import type { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

import { BusitionLogo } from "@/components/busition-logo";

export const metadata: Metadata = {
  title: "개인정보 처리방침 | Busition",
  description: "버지션(Busition) 개인정보 처리방침",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <header className="top-fade sticky top-0 z-40 border-b border-[var(--line)]">
        <div className="mx-auto flex w-full max-w-[960px] items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <Link href="/" aria-label="Busition home">
            <BusitionLogo compact />
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-white px-4 py-2 text-sm font-semibold text-[var(--foreground-soft)] transition-colors hover:text-[var(--foreground)]"
          >
            <ChevronLeft className="h-4 w-4" />
            홈으로
          </Link>
        </div>
      </header>

      <section className="mx-auto flex w-full max-w-[960px] flex-1 flex-col gap-6 px-6 py-8 sm:px-8 sm:py-10">
        <h1 className="text-2xl font-bold text-[var(--foreground)]">개인정보 처리방침</h1>
        <p className="text-[15px] leading-8 text-[var(--foreground-soft)]">
          {`< 버지션 (Busition) >('https://busition.io'이하 'Busition')은(는) 「개인정보 보호법」 제30조에 따라 정보주체의 개인정보를 보호하고 이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록 하기 위하여 다음과 같이 개인정보 처리방침을 수립·공개합니다.`}
        </p>
        <p className="text-[15px] leading-8 text-[var(--foreground-soft)]">
          ○ 이 개인정보처리방침은 2023년 5월 22부터 적용됩니다.
        </p>

        <h2 className="text-lg font-semibold text-[var(--foreground)]">제 1조(개인정보의 처리 목적)</h2>
        <p className="text-[15px] font-bold leading-8 text-[var(--foreground)]">
          {`< 버지션 (Busition) >('https://busition.io'이하 'Busition')은(는) 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며 이용 목적이 변경되는 경우에는 「개인정보 보호법」 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.`}
        </p>
        <h3 className="text-base font-semibold text-[var(--foreground)]">1. 홈페이지 회원가입 및 관리</h3>
        <p className="text-[15px] leading-8 text-[var(--foreground-soft)]">
          회원 가입의사 확인, 회원제 서비스 제공에 따른 본인 식별·인증, 회원자격 유지·관리, 서비스 부정이용 방지, 각종 고지·통지, 고충처리 목적으로 개인정보를 처리합니다.
        </p>
        <h3 className="text-base font-semibold text-[var(--foreground)]">2. 민원사무 처리</h3>
        <p className="text-[15px] leading-8 text-[var(--foreground-soft)]">
          민원인의 신원 확인, 민원사항 확인, 사실조사를 위한 연락·통지, 처리결과 통보 목적으로 개인정보를 처리합니다.
        </p>
        <h3 className="text-base font-semibold text-[var(--foreground)]">3. 재화 또는 서비스 제공</h3>
        <p className="text-[15px] leading-8 text-[var(--foreground-soft)]">
          서비스 제공, 계약서·청구서 발송, 맞춤서비스 제공, 본인인증, 요금결제·정산을 목적으로 개인정보를 처리합니다.
        </p>
        <h3 className="text-base font-semibold text-[var(--foreground)]">4. 마케팅 및 광고에의 활용</h3>
        <p className="text-[15px] leading-8 text-[var(--foreground-soft)]">
          신규 서비스(제품) 개발 및 맞춤 서비스 제공, 이벤트 및 광고성 정보 제공 및 참여기회 제공 , 서비스의 유효성 확인, 접속빈도 파악 또는 회원의 서비스 이용에 대한 통계 등을 목적으로 개인정보를 처리합니다.
        </p>

        <h2 className="text-lg font-semibold text-[var(--foreground)]">제 2조(개인정보의 처리 및 보유기간)</h2>
        <h3 className="text-base font-semibold text-[var(--foreground)]">
          ① &lt; 버지션 (Busition) &gt;은(는) 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집 시에 동의받은 개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다.
        </h3>
        <h3 className="text-base font-semibold text-[var(--foreground)]">② 각각의 개인정보 처리 및 보유 기간은 다음과 같습니다.</h3>
        <ul className="list-disc space-y-1 pl-6 text-[15px] leading-8 text-[var(--foreground-soft)]">
          <li>1.&lt;홈페이지 회원가입 및 관리&gt;</li>
          <li>&lt;홈페이지 회원가입 및 관리&gt;와 관련한 개인정보는 수집.이용에 관한 동의일로부터&lt;5년&gt;까지 위 이용목적을 위하여 보유.이용됩니다.</li>
          <li>보유근거 : 계약 또는 청약철회 등에 관한 기록</li>
          <li>관련법령 : 계약 또는 청약철회 등에 관한 기록 : 5년</li>
          <li>예외사유 : 계정 유지</li>
        </ul>

        <h2 className="text-lg font-semibold text-[var(--foreground)]">제 3조(처리하는 개인정보의 항목)</h2>
        <h3 className="text-base font-semibold text-[var(--foreground)]">
          ① &lt; 버지션 (Busition) &gt;은(는) 다음의 개인정보 항목을 처리하고 있습니다.
        </h3>
        <ul className="list-disc space-y-1 pl-6 text-[15px] leading-8 text-[var(--foreground-soft)]">
          <li>1&lt; 홈페이지 회원가입 및 관리 &gt;</li>
          <li>필수항목 : 이름, 로그인ID, 비밀번호, 휴대전화번호, 이메일</li>
          <li>선택항목 : 생년월일, 성별, 자택주소, 접속 IP 정보, 쿠키, 접속 로그, 서비스 이용 기록, 법정대리인 휴대전화번호, 법정대리인 자택 주소, 법정대리인 자택 전화번호, 법정대리인 이름</li>
        </ul>

        <h2 className="text-lg font-semibold text-[var(--foreground)]">제 4조(만 14세 미만 아동의 개인정보 처리에 관한 사항)</h2>
        <h3 className="text-base font-semibold text-[var(--foreground)]">
          ① &lt;개인정보처리자명&gt;은(는) 만 14세 미만 아동에 대해 개인정보를 수집할 때 법정대리인의 동의를 얻어 해당 서비스 수행에 필요한 최소한의 개인정보를 수집합니다.
        </h3>
        <p className="text-[15px] leading-8 text-[var(--foreground-soft)]">필수항목 : 법정 대리인의 성명, 관계, 연락처</p>
        <h3 className="text-base font-semibold text-[var(--foreground)]">
          ② 또한, &lt;개인정보처리자명&gt;의 &lt;처리목적&gt; 관련 홍보를 위해 아동의 개인정보를 수집할 경우에는 법정대리인으로부터 별도의 동의를 얻습니다
        </h3>
        <h3 className="text-base font-semibold text-[var(--foreground)]">
          ③ &lt;개인정보처리자명&gt;은(는) 만 1 4세 미만 아동의 개인정보를 수집할 때에는 아동에게 법정대리인의 성명, 연락처와 같이 최소한의 정보를 요구할 수 있으며, 다음 중 하나의 방법으로 적법한 법정대리인이 동의하였는지를 확인합니다.
        </h3>
        <ul className="list-disc space-y-1 pl-6 text-[15px] leading-8 text-[var(--foreground-soft)]">
          <li>동의 내용을 게재한 인터넷 사이트에 법정대리인이 동의 여부를 표시하도록 하고 개인정보처리자가 그 동의 표시를 확인했음을 법정대리인의 휴대전화 문자 메시지로 알리는 방법</li>
          <li>동의 내용을 게재한 인터넷 사이트에 법정대리인이 동의 여부를 표시하도록 하고 법정대리인의 신용카드·직불카드 등의 카드정보를 제공받는 방법</li>
          <li>동의 내용을 게재한 인터넷 사이트에 법정대리인이 동의 여부를 표시하도록 하고 법정대리인의 휴대전화 본인인증 등을 통해 본인 여부를 확인하는 방법</li>
          <li>동의 내용이 적힌 서면을 법정대리인에게 직접 발급하거나, 우편 또는 팩스를 통하여 전달하고 법정대리인이 동의 내용에 대하여 서명날인 후 제출하도록 하는 방법</li>
          <li>동의 내용이 적힌 전자우편을 발송하여 법정대리인으로부터 동의의 의사표시가 적힌 전자우편을 전송받는 방법</li>
          <li>전화를 통하여 동의 내용을 법정대리인에게 알리고 동의를 얻거나 인터넷주소 등 동의 내용을 확인할 수 있는 방법을 안내하고 재차 전화 통화를 통하여 동의를 얻는 방법</li>
          <li>그 밖에 위와 준하는 방법으로 법정대리인에게 동의 내용을 알리고 동의의 의사표시를 확인하는 방법</li>
        </ul>

        <h2 className="text-lg font-semibold text-[var(--foreground)]">제 5조(개인정보의 제 3자 제공에 대한 사항)</h2>
        <h3 className="text-base font-semibold text-[var(--foreground)]">
          ① &lt; 버지션 (Busition) &gt;은(는) 개인정보를 제1조(개인정보의 처리 목적)에서 명시한 범위 내에서만 처리하며, 정보주체의 동의, 법률의 특별한 규정 등 「개인정보 보호법」 제17조 및 제18조에 해당하는 경우에만 개인정보를 제3자에게 제공합니다.
        </h3>
        <h3 className="text-base font-semibold text-[var(--foreground)]">
          ① &lt; 버지션 (Busition) &gt;은(는) 개인정보를 제1조(개인정보의 처리 목적)에서 명시한 범위 내에서만 처리하며, 정보주체의 동의, 법률의 특별한 규정 등 「개인정보 보호법」 제17조 및 제18조에 해당하는 경우에만 개인정보를 제3자에게 제공합니다.
        </h3>
        <ul className="list-disc space-y-1 pl-6 text-[15px] leading-8 text-[var(--foreground-soft)]">
          <li>1. &lt; Firebase &gt;</li>
          <li>개인정보를 제공받는 자 : Firebase</li>
          <li>제공받는 자의 개인정보 이용목적 : 회원 관리</li>
          <li>제공받는 자의 보유.이용기간: 서비스 탈퇴시까지</li>
          <li>Google 개인정보보호 정책: https://policies.google.com/privacy</li>
          <li>Firebase 개인정보보호 정책: https://firebase.google.com/support/privacy</li>
        </ul>

        <h2 className="text-lg font-semibold text-[var(--foreground)]">제 6조(개인정보처리의 위탁에 관한 사항)</h2>
        <h3 className="text-base font-semibold text-[var(--foreground)]">
          ① &lt; 버지션 (Busition) &gt;은(는) 원활한 개인정보 업무처리를 위하여 다음과 같이 개인정보 처리업무를 위탁하고 있습니다.
        </h3>
        <ul className="list-disc space-y-1 pl-6 text-[15px] leading-8 text-[var(--foreground-soft)]">
          <li>1. &lt; Firebase &gt;</li>
          <li>위탁받는 자 (수탁자) : Firebase</li>
          <li>위탁하는 업무의 내용 : 회원 관리</li>
          <li>위탁기간 : 서비스 탈퇴시까지</li>
          <li>Google 개인정보보호 정책: https://policies.google.com/privacy</li>
          <li>Firebase 개인정보보호 정책: https://firebase.google.com/support/privacy</li>
        </ul>
        <h3 className="text-base font-semibold text-[var(--foreground)]">
          ② &lt; 버지션 (Busition) &gt;은(는) 위탁계약 체결시 「개인정보 보호법」 제26조에 따라 위탁업무 수행목적 외 개인정보 처리금지, 기술적․관리적 보호조치, 재위탁 제한, 수탁자에 대한 관리․감독, 손해배상 등 책임에 관한 사항을 계약서 등 문서에 명시하고, 수탁자가 개인정보를 안전하게 처리하는지를 감독하고 있습니다.
        </h3>
        <h3 className="text-base font-semibold text-[var(--foreground)]">
          ③ 위탁업무의 내용이나 수탁자가 변경될 경우에는 지체없이 본 개인정보 처리방침을 통하여 공개하도록 하겠습니다.
        </h3>

        <h2 className="text-lg font-semibold text-[var(--foreground)]">제 7조(개인정보의 파기절차 및 파기 방법)</h2>
        <h3 className="text-base font-semibold text-[var(--foreground)]">
          ① &lt; 버지션 (Busition) &gt; 은(는) 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는 지체없이 해당 개인정보를 파기합니다.
        </h3>
        <h3 className="text-base font-semibold text-[var(--foreground)]">
          ② 정보주체로부터 동의받은 개인정보 보유기간이 경과하거나 처리목적이 달성되었음에도 불구하고 다른 법령에 따라 개인정보를 계속 보존하여야 하는 경우에는, 해당 개인정보를 별도의 데이터베이스(DB)로 옮기거나 보관장소를 달리하여 보존합니다.
        </h3>
        <ul className="list-disc space-y-1 pl-6 text-[15px] leading-8 text-[var(--foreground-soft)]">
          <li>1. 법령 근거 :</li>
          <li>2. 보존하는 개인정보 항목 : 계좌정보, 거래날짜</li>
        </ul>
        <h3 className="text-base font-semibold text-[var(--foreground)]">③ 개인정보 파기의 절차 및 방법은 다음과 같습니다.</h3>
        <ul className="list-disc space-y-3 pl-6 text-[15px] leading-8 text-[var(--foreground-soft)]">
          <li>
            1. 파기절차
            <p className="mt-1">
              &lt; 버지션 (Busition) &gt; 은(는) 파기 사유가 발생한 개인정보를 선정하고, &lt; 버지션 (Busition) &gt; 의 개인정보 보호책임자의 승인을 받아 개인정보를 파기합니다.
            </p>
          </li>
          <li>
            2. 파기방법
            <ul className="mt-1 list-disc space-y-1 pl-6">
              <li>종이에 출력된 개인정보는 분쇄기로 분쇄하거나 소각을 통하여 파기합니다.</li>
              <li>전자적 파일 형태의 정보는 기록을 재생할 수 없는 기술적 방법을 사용합니다</li>
            </ul>
          </li>
        </ul>

        <h2 className="text-lg font-semibold text-[var(--foreground)]">제 8조(정보주체와 법정대리인의 권리·의무 및 그 행사방법에 관한 사항)</h2>
        <ul className="flex flex-col gap-1 text-[15px] leading-8 text-[var(--foreground-soft)]">
          <li>① 정보주체는 버지션 (Busition)에 대해 언제든지 개인정보 열람·정정·삭제·처리정지 요구 등의 권리를 행사할 수 있습니다.</li>
          <li>② 제1항에 따른 권리 행사는버지션 (Busition)에 대해 「개인정보 보호법」 시행령 제41조제1항에 따라 서면, 전자우편, 모사전송(FAX) 등을 통하여 하실 수 있으며 버지션 (Busition)은(는) 이에 대해 지체 없이 조치하겠습니다.</li>
          <li>③ 제1항에 따른 권리 행사는 정보주체의 법정대리인이나 위임을 받은 자 등 대리인을 통하여 하실 수 있습니다.이 경우 “개인정보 처리 방법에 관한 고시(제2020-7호)” 별지 제11호 서식에 따른 위임장을 제출하셔야 합니다.</li>
          <li>④ 개인정보 열람 및 처리정지 요구는 「개인정보 보호법」 제35조 제4항, 제37조 제2항에 의하여 정보주체의 권리가 제한 될 수 있습니다.</li>
          <li>⑤ 개인정보의 정정 및 삭제 요구는 다른 법령에서 그</li>
          <li>2. 개인정보침해신고센터 : (국번없이) 118 (privacy.kisa.or.kr)</li>
          <li>3. 대검찰청 : (국번없이) 1301 (www.spo.go.kr)</li>
          <li>4. 경찰청 : (국번없이) 182 (ecrm.cyber.go.kr)</li>
        </ul>
        <p className="text-[15px] leading-8 text-[var(--foreground-soft)]">
          「개인정보보호법」제35조(개인정보의 열람), 제36조(개인정보의 정정·삭제), 제37조(개인정보의 처리정지 등)의 규정에 의한 요구에 대 하여 공공기관의 장이 행한 처분 또는 부작위로 인하여 권리 또는 이익의 침해를 받은 자는 행정심판법이 정하는 바에 따라 행정심판을 청구할 수 있습니다.
        </p>
        <p className="text-[15px] leading-8 text-[var(--foreground-soft)]">
          ※ 행정심판에 대해 자세한 사항은 중앙행정심판위원회(www.simpan.go.kr) 홈페이지를 참고하시기 바랍니다.
        </p>

        <h2 className="text-lg font-semibold text-[var(--foreground)]">제 17조(개인정보 처리방침 변경)</h2>
        <p className="text-[15px] leading-8 text-[var(--foreground-soft)]">
          ① 이 개인정보처리방침은 2023년 5월 22부터 적용됩니다.
        </p>
      </section>
    </main>
  );
}
