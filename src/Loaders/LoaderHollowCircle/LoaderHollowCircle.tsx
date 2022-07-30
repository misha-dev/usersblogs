import cl from "./LoaderHollowCircle.module.scss";

export const LoaderHollowCircle = () => {
  return (
    <div className={cl.ldsRingWrapper}>
      <div className={cl.ldsRing}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};
