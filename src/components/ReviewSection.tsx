import React, { useState, useEffect } from 'react';
import { Star, MessageSquarePlus, ExternalLink, ThumbsUp } from 'lucide-react';
import { REVIEWS, ReviewItem, CAFE_INFO } from '../data/cafeData';

export const ReviewSection: React.FC = () => {
  const [reviewsList, setReviewsList] = useState<ReviewItem[]>(REVIEWS);
  const [showAddModal, setShowAddModal] = useState(false);
  const [authorName, setAuthorName] = useState('');
  const [newContent, setNewContent] = useState('');
  const [selectedTag, setSelectedTag] = useState('디저트가 특별해요');
  const [rating, setRating] = useState(5);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('kkoma_custom_reviews');
      if (saved) {
        const parsed = JSON.parse(saved);
        setReviewsList([...parsed, ...REVIEWS]);
      }
    } catch {
      // ignore
    }
  }, []);

  const handleLike = (id: string) => {
    setReviewsList((prev) =>
      prev.map((r) => (r.id === id ? { ...r, likes: r.likes + 1 } : r))
    );
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !newContent.trim()) return;

    const newRev: ReviewItem = {
      id: `custom-${Date.now()}`,
      author: authorName.trim(),
      date: new Date().toISOString().slice(0, 10).replace(/-/g, '.'),
      rating,
      content: newContent.trim(),
      tag: selectedTag,
      likes: 1,
    };

    const updated = [newRev, ...reviewsList];
    setReviewsList(updated);

    try {
      const customOnly = updated.filter((r) => r.id.startsWith('custom-'));
      localStorage.setItem('kkoma_custom_reviews', JSON.stringify(customOnly));
    } catch {
      // ignore
    }

    setAuthorName('');
    setNewContent('');
    setShowAddModal(false);
  };

  return (
    <section id="reviews" className="py-16 md:py-24 bg-[#FCFBF7] border-t border-[#F0ECE4]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header & Overall Rating */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-xl">
            <div className="text-xs text-[#FF5B00] font-bold tracking-wider uppercase">
              Naver Place Visitor Reviews
            </div>
            <h2 className="font-brand text-2xl sm:text-3xl lg:text-4xl font-black text-[#18181B] tracking-tight">
              손님들이 전하는 COMA CAFE 이야기
            </h2>
            <p className="text-sm text-[#52525B]">
              네이버 플레이스에 남겨주신 소중한 방문자 실시간 리뷰와 따뜻한 마음들입니다.
            </p>
          </div>

          {/* Aggregate Rating Pill-less Box */}
          <div className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-[#EBE5DC] shadow-xs">
            <div className="text-center pr-4 border-r border-[#F0ECE4]">
              <div className="font-brand text-3xl font-black text-[#18181B] tabular-nums">
                4.95
              </div>
              <div className="flex items-center gap-0.5 text-amber-500 justify-center mt-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
            </div>
            <div className="text-xs text-[#71717A] space-y-1">
              <div>네이버 플레이스 만족도 <strong className="text-[#18181B]">최우수</strong></div>
              <div>&ldquo;크로플이 바삭하고 포토존이 예뻐요&rdquo;</div>
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="flex items-center justify-between gap-4 mb-8">
          <div className="text-xs text-[#71717A]">
            총 <span className="font-bold text-[#18181B]">{reviewsList.length}</span>개의 후기
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-[#FFF5ED] text-[#18181B] hover:text-[#FF5B00] border border-[#E4E4E7] hover:border-[#FF5B00] text-xs font-bold transition-all cursor-pointer shadow-xs"
            >
              <MessageSquarePlus className="w-3.5 h-3.5 text-[#FF5B00]" />
              <span>방명록 남기기</span>
            </button>

            <a
              href={`${CAFE_INFO.naverMapUrl}#review`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#03C75A]/10 hover:bg-[#03C75A]/20 text-[#028a3d] text-xs font-bold transition-colors"
            >
              <span>네이버 플레이스 전체보기</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviewsList.map((rev) => (
            <div
              key={rev.id}
              className="bg-white p-6 rounded-3xl border border-[#EBE5DC] shadow-xs flex flex-col justify-between space-y-4 hover:border-[#FF5B00]/40 transition-colors"
            >
              <div className="space-y-3">
                {/* Author, rating, date */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-brand text-sm font-bold text-[#18181B]">
                      {rev.author}
                    </span>
                    <span aria-hidden="true" className="text-[#E4E4E7]">·</span>
                    <span className="text-[11px] text-[#FF5B00] font-semibold">{rev.tag}</span>
                  </div>
                  <div className="flex items-center gap-0.5 text-amber-500">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-current" />
                    ))}
                  </div>
                </div>

                {/* Content */}
                <p className="text-xs sm:text-sm text-[#3F3F46] leading-relaxed">
                  &ldquo;{rev.content}&rdquo;
                </p>
              </div>

              {/* Footer */}
              <div className="pt-3 border-t border-[#F4F1EA] flex items-center justify-between text-xs text-[#71717A]">
                <span className="font-mono text-[11px]">{rev.date}</span>
                <button
                  onClick={() => handleLike(rev.id)}
                  className="flex items-center gap-1 hover:text-[#FF5B00] transition-colors cursor-pointer"
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span className="font-mono text-[11px] tabular-nums font-bold">{rev.likes}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Review Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-[#EBE5DC] p-6 space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-[#F0ECE4] pb-3">
              <h3 className="font-brand text-lg font-bold text-[#18181B]">
                COMA CAFE 방명록 남기기
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-[#71717A] hover:text-[#18181B] text-sm cursor-pointer"
              >
                닫기
              </button>
            </div>

            <form onSubmit={handleSubmitReview} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#18181B] mb-1">
                  닉네임 (성함 또는 별칭)
                </label>
                <input
                  type="text"
                  required
                  placeholder="예: 신림동 단골러"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#FCFBF7] border border-[#E4E4E7] rounded-xl text-[#18181B] focus:outline-hidden focus:border-[#FF5B00]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#18181B] mb-1">
                  만족도 별점
                </label>
                <div className="flex items-center gap-1 text-amber-500">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="p-1 cursor-pointer"
                    >
                      <Star
                        className={`w-5 h-5 ${star <= rating ? 'fill-current' : 'text-slate-300'}`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#18181B] mb-1">
                  가장 마음에 든 점
                </label>
                <select
                  value={selectedTag}
                  onChange={(e) => setSelectedTag(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#FCFBF7] border border-[#E4E4E7] rounded-xl text-[#18181B] focus:outline-hidden focus:border-[#FF5B00]"
                >
                  <option value="디저트가 특별해요">디저트가 특별해요 (브라운치즈 크로플/마카롱)</option>
                  <option value="음료가 맛있어요">음료가 맛있어요 (꼬마 아인슈페너/달고나라떼)</option>
                  <option value="인테리어가 멋져요">인테리어가 멋져요 (오렌지 파사드 & 코랄 부스)</option>
                  <option value="사진이 잘 나와요">사진이 잘 나와요 (플라워 거울 & 핑크폰)</option>
                  <option value="늦게까지 열려있어요">늦게까지 열려있어요 (새벽 5시까지)</option>
                  <option value="마스코트가 귀여워요">마스코트 '꼬마'가 귀여워요</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#18181B] mb-1">
                  방문 후기 내용
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="COMA CAFE에서의 경험이나 꼬마에게 전하고 싶은 말을 자유롭게 적어주세요."
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#FCFBF7] border border-[#E4E4E7] rounded-xl text-[#18181B] focus:outline-hidden focus:border-[#FF5B00]"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#F0ECE4]">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-xs text-[#71717A] hover:text-[#18181B] cursor-pointer"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#FF5B00] hover:bg-[#E65200] text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
                >
                  후기 등록하기
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
