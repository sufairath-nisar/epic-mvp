const AutoCarousel = ({ items, renderItem, className = "", trackClassName = "", getKey = (item) => item.id ?? item.label }) => {
  const carouselItems = [...items, ...items];

  return (
    <div className={`overflow-hidden ${className}`}>
      <div className={`flex w-max ${trackClassName}`}>{carouselItems.map((item, index) => renderItem(item, `${getKey(item)}-${index}`, index))}</div>
    </div>
  );
};

export default AutoCarousel;
