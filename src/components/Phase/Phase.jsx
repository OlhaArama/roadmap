import './Phase.css';

export const Phase = ({ title, list }) => {
  return (
    <div className="phase">
      <div className="phase__content">
        <h2 className="phase__title">
          {title}
        </h2>

        <ul className="phase__list">
          {list.map(item => (
            <li key={item} className="phase__item">{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};
