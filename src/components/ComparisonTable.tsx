import React, { useState } from 'react';
import { COMPARISON_TABLE_DATA } from '../data/products';
import { ProductId } from '../types';
import { Check, ArrowRight } from 'lucide-react';

interface ComparisonTableProps {
  onSelectProduct: (productId: ProductId) => void;
}

export const ComparisonTable: React.FC<ComparisonTableProps> = ({ onSelectProduct }) => {
  const [highlightedColumn, setHighlightedColumn] = useState<ProductId | null>(null);

  const productsList: { id: ProductId; title: string; subtitle: string; price: string }[] = [
    {
      id: 'powerbank',
      title: '🔋 알람 탑제 보조배터리',
      subtitle: '22.5W 고속 & 케이블 일체형',
      price: '24,500원',
    },
    {
      id: 'dumbbell',
      title: '🏋️ 덤벨 알람시계',
      subtitle: '1~5kg & 원판 교체형',
      price: '10,000원~',
    },
    {
      id: 'carpet',
      title: '👣 카펫 알람시계',
      subtitle: '직립 감지 메모리폼',
      price: '15,000원',
    },
  ];

  return (
    <section id="comparison" className="scroll-mt-20 py-16 sm:py-20 bg-neutral-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-400">
            <span>COMPARISON MATRIX</span>
            <span aria-hidden="true">·</span>
            <span>한눈에 보는 알람시계 3종 비교 요약표</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            나에게 딱 맞는 기상 솔루션은?
          </h2>
          <p className="text-sm text-neutral-300">
            주요 사용 공간, 잠을 깨우는 방식, 그리고 내구성까지 비교해보고 결정하세요.
          </p>
        </div>

        {/* Comparison Table Container */}
        <div className="overflow-x-auto rounded-2xl border border-neutral-800 bg-neutral-950 shadow-xl">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-neutral-800 bg-neutral-900/80">
                <th className="p-4 sm:p-5 text-xs font-bold text-neutral-400 w-1/4">
                  비교 항목
                </th>
                {productsList.map((prod) => (
                  <th
                    key={prod.id}
                    onClick={() => setHighlightedColumn(prod.id)}
                    className={`p-4 sm:p-5 w-1/4 cursor-pointer transition-colors ${
                      highlightedColumn === prod.id
                        ? 'bg-amber-400/10 border-b-2 border-amber-400'
                        : 'hover:bg-neutral-800/40'
                    }`}
                  >
                    <div className="font-extrabold text-sm sm:text-base text-white">
                      {prod.title}
                    </div>
                    <div className="text-xs text-neutral-400 mt-0.5">{prod.subtitle}</div>
                    <div className="text-sm font-extrabold text-amber-400 mt-1">
                      {prod.price}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/60 text-xs sm:text-sm">
              {COMPARISON_TABLE_DATA.map((row, idx) => (
                <tr
                  key={idx}
                  className="hover:bg-neutral-900/40 transition-colors"
                >
                  <td className="p-4 sm:p-5 font-bold text-neutral-300 bg-neutral-900/30">
                    {row.category}
                  </td>
                  <td
                    className={`p-4 sm:p-5 whitespace-pre-line leading-relaxed ${
                      highlightedColumn === 'powerbank' ? 'bg-amber-400/5 font-medium text-white' : 'text-neutral-300'
                    }`}
                  >
                    {row.powerbank}
                  </td>
                  <td
                    className={`p-4 sm:p-5 whitespace-pre-line leading-relaxed ${
                      highlightedColumn === 'dumbbell' ? 'bg-amber-400/5 font-medium text-white' : 'text-neutral-300'
                    }`}
                  >
                    {row.dumbbell}
                  </td>
                  <td
                    className={`p-4 sm:p-5 whitespace-pre-line leading-relaxed ${
                      highlightedColumn === 'carpet' ? 'bg-amber-400/5 font-medium text-white' : 'text-neutral-300'
                    }`}
                  >
                    {row.carpet}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t border-neutral-800 bg-neutral-900/80">
                <td className="p-4 sm:p-5 font-bold text-neutral-400">
                  선택 및 바로가기
                </td>
                {productsList.map((prod) => (
                  <td key={prod.id} className="p-4 sm:p-5">
                    <button
                      type="button"
                      onClick={() => onSelectProduct(prod.id)}
                      className="w-full py-2.5 px-3 text-xs font-bold rounded-lg text-neutral-950 bg-amber-400 hover:bg-amber-300 transition-colors flex items-center justify-center gap-1.5 shadow-sm active:scale-95"
                    >
                      <span>상세 및 주문</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </td>
                ))}
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Small legend notice */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-neutral-400 pt-2">
          <div className="flex items-center gap-1.5">
            <Check className="w-4 h-4 text-amber-400" />
            <span>3종 모두 공식 안전 인증 및 품질 검사 완료</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Check className="w-4 h-4 text-amber-400" />
            <span>단순 변심 시 7일 이내 안심 환불 보장</span>
          </div>
        </div>

      </div>
    </section>
  );
};
