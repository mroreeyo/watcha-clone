// RecommendCategory.tsx
const RecommendCategory = () => {
  const categories = ["왓챠의 발견", "한국", "애니메이션", "성인+"];

  return (
    <div className="category-wrapper">
      <button className="active">추천</button>
      {categories.map((category) => (
        <button key={category}>#{category}</button>
      ))}
    </div>
  );
};

export default RecommendCategory;