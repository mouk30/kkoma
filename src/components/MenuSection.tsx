import React, { useState, useMemo } from 'react';
import { Search, Plus, Coffee, Sparkles } from 'lucide-react';
import { MENU_ITEMS, MenuItem } from '../data/cafeData';

interface MenuSectionProps {
  onSelectItem: (item: MenuItem) => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({ onSelectItem }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: 'all', label: '전체 메뉴' },
    { id: 'signature', label: 'COMA 시그니처' },
    { id: 'dessert', label: '수제 크로플 & 디저트' },
    { id: 'coffee', label: '스페셜티 커피' },
    { id: 'non-coffee', label: '에이드 & 시즈널 음료' },
  ];

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      const matchCat =
        selectedCategory === 'all' || item.category === selectedCategory;
      const matchSearch =
        searchQuery.trim() === '' ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCat && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section id="menu" className="py-14 sm:py-20 md:py-24 bg-white border-t border-[#F0ECE4]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10 space-y-2.5 sm:space-y-3">
          <div className="text-xs text-[#FF5B00] font-bold tracking-wider uppercase flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Specialty Brews & Fresh Bakes</span>
          </div>
          <h2 className="font-brand text-2xl sm:text-3xl lg:text-4xl font-black text-[#18181B] tracking-tight break-keep">
            COMA CAFE 시그니처 메뉴
          </h2>
          <p className="text-sm sm:text-base text-[#52525B] leading-relaxed break-keep">
            프랑스산 발효버터로 주문 즉시 구워내는 바삭한 브라운치즈 크로플과
            묵직한 특제 크림이 매력적인 아인슈페너까지, 새벽 5시까지 언제든 준비되어 있습니다.
          </p>
        </div>

        {/* Filter Bar & Search */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 sm:gap-4 mb-6 sm:mb-8">
          {/* Segmented Filter Controls */}
          <div className="flex items-center gap-1.5 p-1 sm:p-1.5 bg-[#F4F1EA] rounded-2xl overflow-x-auto scrollbar-none touch-pan-x">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`min-h-[40px] px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all whitespace-nowrap cursor-pointer shrink-0 ${
                  selectedCategory === cat.id
                    ? 'bg-[#FF5B00] text-white shadow-xs'
                    : 'text-[#52525B] hover:text-[#18181B] hover:bg-[#EBE6DC]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A1A1AA]" />
            <input
              type="text"
              placeholder="메뉴나 재료로 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 sm:py-2 text-xs sm:text-sm bg-[#FCFBF7] border border-[#E4E4E7] rounded-xl text-[#18181B] placeholder-[#A1A1AA] focus:outline-hidden focus:border-[#FF5B00] transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#A1A1AA] hover:text-[#18181B] p-1"
              >
                지우기
              </button>
            )}
          </div>
        </div>

        {/* Menu Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-[#FCFBF7] rounded-3xl border border-[#EBE5DC]">
            <Coffee className="w-10 h-10 mx-auto text-[#A1A1AA] mb-3" />
            <p className="font-brand text-base font-bold text-[#18181B]">
              검색된 메뉴가 없습니다
            </p>
            <p className="text-xs text-[#71717A] mt-1">
              다른 검색어를 입력하시거나 카테고리 필터를 변경해 보세요.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 text-xs font-bold bg-[#FF5B00] text-white rounded-xl hover:bg-[#E65200] transition-colors"
            >
              전체 메뉴 보기
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="group relative bg-[#FCFBF7] rounded-3xl border border-[#EBE5DC] overflow-hidden hover:border-[#FF5B00]/40 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                {/* Image Container with Fallback */}
                <div className="relative aspect-[4/3] bg-[#F7F5F0] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
                  />
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                  {/* Clean text badge */}
                  {item.badge && (
                    <div className="absolute top-3 left-3 bg-[#FF5B00] text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-xs">
                      {item.badge}
                    </div>
                  )}

                  {/* Temperature affordance */}
                  {item.tempOptions !== 'NONE' && (
                    <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-xs text-[#27272A] text-[10px] font-bold px-2.5 py-1 rounded-full border border-[#E4E4E7] shadow-2xs">
                      {item.tempOptions === 'ICE' && 'ONLY ICE'}
                      {item.tempOptions === 'HOT' && 'ONLY HOT'}
                      {item.tempOptions === 'BOTH' && 'HOT / ICE'}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    {/* Unboxed category / tags with dot separators */}
                    <div className="flex items-center gap-1.5 text-[11px] text-[#FF5B00] mb-1 font-bold">
                      <span>
                        {item.category === 'signature' && '시그니처'}
                        {item.category === 'dessert' && '수제 디저트'}
                        {item.category === 'coffee' && '스페셜티 커피'}
                        {item.category === 'non-coffee' && '음료 & 에이드'}
                      </span>
                      {item.tags.slice(0, 2).map((tag, idx) => (
                        <React.Fragment key={idx}>
                          <span aria-hidden="true" className="text-[#D4D4D8]">·</span>
                          <span className="text-[#71717A] font-normal">{tag}</span>
                        </React.Fragment>
                      ))}
                    </div>

                    <h3 className="font-brand text-base sm:text-lg font-bold text-[#18181B] group-hover:text-[#FF5B00] transition-colors leading-snug break-keep">
                      {item.name}
                    </h3>
                    <p className="text-[11px] text-[#A1A1AA] mt-0.5">
                      {item.nameEn}
                    </p>

                    <p className="text-xs text-[#52525B] mt-2 leading-relaxed break-keep line-clamp-2">
                      {item.description}
                    </p>
                  </div>

                  {/* Price & Action Button */}
                  <div className="pt-3 border-t border-[#F0ECE4] flex items-center justify-between gap-2">
                    <div>
                      <span className="text-[11px] text-[#A1A1AA] block">단품 가격</span>
                      <span className="font-brand text-base sm:text-lg font-black text-[#18181B] tabular-nums">
                        {item.price.toLocaleString()}원
                      </span>
                    </div>

                    <button
                      onClick={() => onSelectItem(item)}
                      className="min-h-[42px] flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-[#FF5B00] text-[#18181B] hover:text-white border border-[#E4E4E7] hover:border-[#FF5B00] text-xs font-bold transition-all cursor-pointer whitespace-nowrap group/btn shadow-xs active:scale-95"
                    >
                      <Plus className="w-3.5 h-3.5 text-[#FF5B00] group-hover/btn:text-white transition-colors" />
                      <span>담기 / 옵션</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
