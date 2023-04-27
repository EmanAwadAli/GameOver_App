import React from "react";
import Skeleton from "react-loading-skeleton";

export default function CardSkeleton({
  cols,
  cards,
  detailsCount,
  imgHeight,
  detailsHeight,
}) {
  return Array(cards)
    .fill(0)
    .map((card, index) => (
      <div className={cols} key={index}>
        <div className="card_skeleton">
          <Skeleton height={imgHeight} style={{ marginBottom: 5 }} />
          <Skeleton
            count={detailsCount}
            height={detailsHeight}
            style={{ marginBottom: 5 }}
          />
        </div>
      </div>
    ));
}
