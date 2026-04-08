import type { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

import { BusitionLogo } from "@/components/busition-logo";

export const metadata: Metadata = {
  title: "서비스 이용약관 | Busition",
  description: "버지션(Busition) 서비스 이용약관",
};

export default function ServicePolicyPage() {
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

      <section className="mx-auto flex w-full max-w-[960px] flex-1 flex-col gap-4 px-6 py-8 sm:px-8 sm:py-10">
        <h1 className="text-2xl font-bold text-[var(--foreground)]">서비스 이용약관</h1>

        <h2 className="text-lg font-semibold text-[var(--foreground)]">제 1조(목적)</h2>
        <p className="text-[15px] leading-8 text-[var(--foreground-soft)]">
          이 약관은 버지션(Busition) (이하 &apos;회사&apos;라고 합니다)가 제공하는 제반 서비스의 이용과 관련하여 회사와 회원과의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.
        </p>

        <h2 className="text-lg font-semibold text-[var(--foreground)]">제 2조(정의)</h2>
        <p className="whitespace-pre-line text-[15px] leading-8 text-[var(--foreground-soft)]">
          {`이 약관에서 사용하는 주요 용어의 정의는 다음과 같습니다.

1. '서비스'라 함은 구현되는 단말기(PC, TV, 휴대형 단말기 등의 각종 유무선 장치를 포함)와 상관없이 '이용자'가 이용할 수 있는 회사가 제공하는 제반 서비스를 의미합니다.
2. '이용자'란 이 약관에 따라 회사가 제공하는 서비스를 받는 '개인회원', '기업회원' 및 '비회원'을 말합니다.
3. '개인회원'은 회사에 개인정보를 제공하여 회원등록을 한 사람으로, 회사로부터 지속적으로 정보를 제공받고 '회사'가 제공하는 서비스를 계속적으로 이용할 수 있는 자를 말합니다.
4. '기업회원'은 회사에 기업정보 및 개인정보를 제공하여 회원등록을 한 사람으로, 회사로부터 지속적으로 정보를 제공받고 회사가 제공하는 서비스를 계속적으로 이용할 수 있는 자를 말합니다.
5. '비회원'은 회원가입 없이 회사가 제공하는 서비스를 이용하는 자를 말합니다.
6. '아이디(ID)'라 함은 회원의 식별과 서비스 이용을 위하여 회원이 정하고 회사가 승인하는 문자 또는 문자와 숫자의 조합을 의미합니다.
7. '비밀번호'라 함은 회원이 부여받은 아이디와 일치되는 회원임을 확인하고 비밀의 보호를 위해 회원 자신이 정한 문자(특수문자 포함)와 숫자의 조합을 의미합니다.
8. '유료서비스'라 함은 회사가 유료로 제공하는 제반 서비스를 의미합니다.
9. '결제'란 회사가 제공하는 유료서비스를 이용하기 위하여 회원이 지불수단을 선택하고, 금융정보를 입력하는 행위를 말합니다.
10. '할인쿠폰'은 이용자가 회사의 서비스를 이용하면서 그 대가를 지급하는데 사용하기 위하여 회사가 발행 및 관리하는 지급수단을 말합니다.`}
        </p>

        <h2 className="text-lg font-semibold text-[var(--foreground)]">제 3조(약관 외 준칙)</h2>
        <p className="text-[15px] leading-8 text-[var(--foreground-soft)]">
          이 약관에서 정하지 않은 사항에 대해서는 법령 또는 회사가 정한 서비스의 개별약관, 운영정책 및 규칙 등(이하 세부지침)의 규정에 따릅니다. 또한 본 약관과 세부지침이 충돌할 경우에는 세부지침에 따릅니다.
        </p>

        <h2 className="text-lg font-semibold text-[var(--foreground)]">제 4조(약관의 효력과 변경)</h2>
        <p className="whitespace-pre-line text-[15px] leading-8 text-[var(--foreground-soft)]">
          {`1. 이 약관은 버지션(Busition)이 제공하는 모든 인터넷 서비스에 게시하여 공시합니다. 회사는 '전자상거래등에서의 소비자보호에 관한 법률'(이하 '전자상거래법'이라 함), '약관의 규제에 관한 법률'(이하 '약관규제법'이라 함), '정보통신망 이용촉진 및 정보보호 등에 관한 법률'(이하 '정보통신망법'이라 함) 등 본 서비스와 관련된 법령에 위배되지 않는 범위에서 이 약관을 변경할 수 있으며, 회사는 약관이 변경되는 경우에 변경된 약관의 내용과 시행일을 정하여, 그 시행일로부터 최소 7일 (이용자에게 불리하거나 중대한 사항의 변경은 30일) 이전부터 시행일 후 상당한 기간 동안 공지하고, 기존 이용자에게는 변경된 약관, 적용 일자 및 변경사유(변경될 내용 중 중요사항에 대한 설명을 포함)를 별도의 전자적 수단(전자우편, 문자메시지, 서비스 내 전자쪽지 발송, 알림 메시지를 띄우는 등의 방법)으로 개별 통지합니다. 변경된 약관은 공지하거나 통지한 시행일로부터 효력이 발생합니다.
2. 회사가 제1항에 따라 개정약관을 공지 또는 통지하는 경우 '변경에 동의하지 아니한 경우 공지일 또는 통지를 받은 날로부터 7일(이용자에게 불리하거나 중대한 사항의 변경인 경우에는 30일) 내에 계약을 해지할 수 있으며, 계약해지의 의사표시를 하지 아니한 경우에는 변경에 동의한 것으로 본다.'라는 취지의 내용을 함께 통지합니다.
3. 이용 이용자가 변경된 약관에 동의하지 않을 경우 회사와의 이용계약을 해지할 수 있습니다.`}
        </p>

        <h2 className="text-lg font-semibold text-[var(--foreground)]">제 5조(이용자에 대한 통지)</h2>
        <p className="whitespace-pre-line text-[15px] leading-8 text-[var(--foreground-soft)]">
          {`1. 회사는 이 약관에 별도 규정이 없는 한 이용자에게 전자우편, 문자메시지(SMS), 전자쪽지, 푸시(Push) 알림 등의 전자적 수단을 이용하여 통지할 수 있습니다.
2. 회사는 이용자 전체에 대한 통지의 경우 7일 이상 회사가 운영하는 웹사이트 내의 게시판에 게시함으로써 제1항의 통지에 갈음할 수 있습니다. 다만, 이용자 본인의 거래와 관련하여 중대한 영향을 미치는 사항에 대하여는 제1항의 개별 통지를 합니다.
3. 회사는 이용자의 연락처 미기재, 변경 후 미수정, 오기재 등으로 인하여 개별 통지가 어려운 경우에 한하여 전향의 공지를 함으로써 개별 통지를 한 것으로 간주합니다.`}
        </p>

        <h2 className="text-lg font-semibold text-[var(--foreground)]">제 6조(이용계약의 체결)</h2>
        <p className="whitespace-pre-line text-[15px] leading-8 text-[var(--foreground-soft)]">
          {`이용계약은 다음의 경우에 체결됩니다.

          1. 이용자가 회원으로 가입하고자 하는 경우 이용자가 약관의 내용에 대하여 동의를 한 다음 회원가입신청을 하고 회사가 이러한 신청에 대하여 승낙한 때
2. 이용자가 회원 가입 없이 이용할 수 있는 서비스에 대하여 회원 가입의 신청없이 서비스를 이용하고자 하는 경우에는 회사 서비스 이용을 위해 결제하는 때
3. 이용자가 회원가입 없이 이용할 수 있는 서비스에 대하여 회원가입의 신청없이 무료 서비스를 이용하고자 하는 경우에는 그 무료 서비스와 관련된 사항의 저장 등 부가서비스를 이용하면서 위 1호 및 2호의 절차를 진행한 때`}
        </p>

        <h2 className="text-lg font-semibold text-[var(--foreground)]">제 7조(회원가입에 대한 승낙)</h2>
        <p className="whitespace-pre-line text-[15px] leading-8 text-[var(--foreground-soft)]">
          {`1. 회사는 이용계약에 대한 요청이 있을 때 서비스 이용을 승낙함을 원칙으로 합니다.
2. 전항에도 불구하고, 다음 각호의 사유에 해당하는 경우 회사는 회원가입을 보류하거나 거절하는 등 제한할 수 있습니다.
가. 가입신청자가 이 약관에 의하여 이전에 회원자격을 상실한 적이 있는 경우(단, 회사의 재가입 승낙을 얻은 경우에는 예외로 함)
나. 실명이 아니거나 타인의 명의를 도용한 경우
다. 회사가 정하는 필수 정보를 누락하거나 허위로 기재한 경우
라. 만 14세 미만의 아동, 만 19세 미만의 미성년자, 피한정후견인, 피성년후견인이 법정대리인의 동의를 얻지 않은 경우
마. 이용자의 귀책사유로 인하여 승인이 불가능하거나 기타 이 약관 등 회사가 규정한 운영원칙을 위반한 경우
바. 신용정보의 이용과 보호에 관한 법률에 따라 PC통신, 인터넷 서비스의 신용불량자로 등록되어 있는 경우
사. 정보통신윤리위원회에 PC통신, 인터넷 서비스의 불량이용자로 등록되어 있는 경우
아. 이미 사용 중인 회원 정보 또는 공서양속을 저해하는 아이디를 사용하고자 하는 경우
3. 제1항에 따른 신청에 있어 회사는 서비스 제공에 필요한 경우 전문기관을 통한 실명확인 및 본인인증을 요청할 수 있습니다.
4. 회사는 서비스 관련 설비의 여유가 없거나, 기술상 또는 업무상 문제가 있는 경우에는 승낙을 유보할 수 있습니다.
5. 제2항에 따라 서비스 이용을 승낙하지 아니하거나 유보한 경우, 회사는 원칙적으로 이를 서비스 이용 신청자에게 알리도록 합니다. 단, 회사의 귀책사유 없이 이용자에게 알릴 수 없는 경우에는 예외로 합니다.
6. 이용계약의 성립 시기는 제6조 제1호의 경우에는 회사가 가입완료를 신청절차 상에서 표시한 시점, 제6조 제2호의 경우에는 결제가 완료되었다는 표시가 된 시점으로 합니다.
7. 회사는 회원에 대해 회사 정책에 따라 등급별로 구분하여 이용시간, 이용횟수, 서비스 메뉴 등을 세분하여 이용에 차등을 둘 수 있습니다.
8. 회사는 회원에 대하여 '영화 및 비디오물의 진흥에 관한 법률' 및 '청소년보호법' 등에 따른 등급 및 연령 준수를 위하여 이용제한을 할 수 있습니다.`}
        </p>

        <h2 className="text-lg font-semibold text-[var(--foreground)]">제 8조(회원정보의 변경)</h2>
        <p className="text-[15px] leading-8 text-[var(--foreground-soft)]">
          {`1. 회원은 개인정보 관리 화면을 통하여 언제든지 본인의 개인정보를 열람하고 수정할 수 있습니다. 다만, 서비스 관리를 위해 필요한 실명, 아이디 등은 수정이 불가능합니다.
2. 회원은 회원가입 신청 시 기재한 사항이 변경되었을 경우 온라인으로 수정을 하거나 전자우편, 기타 방법으로 회사에 대하여 그 변경사항을 알려야 합니다.
3. 제2항의 변경사항을 회사에 알리지 않아 발생한 불이익에 대하여는 회원에게 책임이 있습니다.`}
        </p>

        <h2 className="text-lg font-semibold text-[var(--foreground)]">제 9조(회원정보의 관리 및 보호)</h2>
        <p className="whitespace-pre-line text-[15px] leading-8 text-[var(--foreground-soft)]">
          {`1. 회원의 아이디(ID)와 비밀번호에 관한 관리 책임은 회원에게 있으며, 이를 제3자가 이용하도록 하여서는 안 됩니다.
2. 회사는 회원의 아이디(ID)가 개인정보 유출 우려가 있거나, 반사회적 또는 공서양속에 어긋나거나, 회사 또는 서비스의 운영자로 오인할 우려가 있는 경우, 해당 아이디(ID)의 이용을 제한할 수 있습니다.
3. 회원은 아이디(ID) 및 비밀번호가 도용되거나 제3자가 사용하고 있음을 인지한 경우에는 이를 즉시 회사에 통지하고 안내에 따라야 합니다.
4. 제3항의 경우 해당 회원이 회사에 그 사실을 통지하지 않거나, 통지하였으나 회사의 안내에 따르지 않아 발생한 불이익에 대하여 회사는 책임지지 않습니다.
`}
        </p>

        <h2 className="text-lg font-semibold text-[var(--foreground)]">제 10조(회사의 의무)</h2>
        <p className="whitespace-pre-line text-[15px] leading-8 text-[var(--foreground-soft)]">
          {`1. 회사는 계속적이고 안정적인 서비스의 제공을 위하여 설비에 장애가 생기거나 멸실된 때에는 이를 지체 없이 수리 또는 복구하며, 다음 각호의 사유 발생 시 부득이한 경우 예고 없이 서비스의 전부 또는 일부의 제공을 일시 중지할 수 있습니다. 이 경우 그 사유 및 중지 기간 등을 이용자에게 지체 없이 사후 공지합니다.
가. 시스템의 긴급 점검, 증설, 교체, 시설의 보수 또는 공사를 하기 위하여 필요한 경우 
나. 새로운 서비스를 제공하기 - 서비스 자체의 결함으로 서비스 이용이 현저히 불가능하였던 경우
3. 회사는 환불 시 이용 대금의 결제 수단과 동일한 방법으로 환불하는 것을 원칙으로 합니다. 다만, 동일한 결제 수단으로 환불이 불가능한 경우 회사가 개별 서비스에서 정하는 별도의 방법으로 환불합니다.
4. 회사는 환불 의무가 발생한 날로부터 3영업일 내에 환불 절차를 진행합니다. 다만, 환불을 위하여 이용자의 협조가 필요한 경우 이용자의 귀책사유로 환불이 지연된 경우 회사는 지연 이자를 부담하지 않습니다.
5. 환불에 필요한 비용은 귀책사유가 있는 쪽이 부담합니다.`}
        </p>

        <h2 className="text-lg font-semibold text-[var(--foreground)]">제 21조(권리의 귀속)</h2>
        <p className="text-[15px] leading-8 text-[var(--foreground-soft)]">
          {`1. 회사가 제공하는 서비스에 대한 저작권 등 지식재산권은 회사에 귀속됩니다.
2. 회사는 서비스와 관련하여 이용자에게 회사가 정한 조건 따라 회사가 제공하는 서비스를 이용할 수 있는 권한만을 부여하며, 이용자는 이를 양도, 판매, 담보 제공하는 등 처분 행위를 할 수 없습니다.`}
        </p>

        <h2 className="text-lg font-semibold text-[var(--foreground)]">제 22조(관할법원 및 준거법)</h2>
        <p className="text-[15px] leading-8 text-[var(--foreground-soft)]">
          서비스와 관련하여 분쟁이 발생한 경우 관할법원은 회사 소재지 관할법원으로 정하며, 준거법은 대한민국의 법령을 적용합니다.
        </p>

        <h2 className="text-lg font-semibold text-[var(--foreground)]">부칙</h2>
        <h2 className="text-lg font-semibold text-[var(--foreground)]">제 1조(시행일)</h2>
        <p className="text-[15px] leading-8 text-[var(--foreground-soft)]">
          본 약관은 2023.07.28부터 시행됩니다.
        </p>
      </section>
    </main>
  );
}
