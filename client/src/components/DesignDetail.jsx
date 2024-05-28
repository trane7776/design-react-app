import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import potrace from 'potrace';
const DesignDetail = ({ user }) => {
  const { id } = useParams();
  const [design, setDesign] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');

  useEffect(() => {
    const fetchDesign = async () => {
      try {
        const response = await fetch(
          `https://design-react-app-production.up.railway.app/design/${id}`
        );
        const data = await response.json();
        setDesign(data);
      } catch (error) {
        console.error('Error fetching design:', error);
      }
    };
    const fetchComments = async () => {
      try {
        const response = await fetch(
          `https://design-react-app-production.up.railway.app/comments/${id}`
        );
        const data = await response.json();
        setComments(data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };
    fetchDesign();
    fetchComments();
  }, [id]);

  if (!design) {
    return <div>Loading...</div>;
  }

  const handlePng = () => {
    const link = document.createElement('a');
    link.download = `${design.name}.png`;
    link.href = design.image;
    link.click();
  };

  const handleSvg = () => {
    potrace.posterize(design.image, (err, svg) => {
      if (err) throw err;
      console.log(svg);
      // Сохранение SVG в файл
      const blob = new Blob([svg], { type: 'image/svg+xml' });

      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.href = url;
      link.download = `${design.name}.svg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    });
  };
  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!commentText) return;
    try {
      const response = await fetch(
        'https://design-react-app-production.up.railway.app/comments',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            design: id,
            text: commentText,
            user: user.username,
          }),
        }
      );

      const newComment = await response.json();
      setComments([...comments, newComment]);
      setCommentText('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };
  return (
    <div className="bg-gray-800 p-4 w-3/6 mx-auto pb-10">
      <h2 className="text-2xl font-bold mb-4 text-white">{design.name}</h2>
      <img src={design.image} alt={design.name} className="mb-4" />
      <p className="text-white">Пользователь: {design.user}</p>
      <div className="flex gap-8 mt-7">
        <button onClick={handlePng}>Скачать в PNG</button>
        <button onClick={handleSvg}>Скачать в SVG</button>
      </div>
      <div className="mt-8">
        <h3 className="text-xl font-bold text-white mb-4">Комментарии</h3>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment._id} className="bg-gray-700 p-4 rounded mb-4">
              <p className="text-white">{comment.text}</p>
              <p className="text-gray-400 text-sm">Автор: {comment.user}</p>
            </div>
          ))
        ) : (
          <p className="text-white">Комментариев пока нет</p>
        )}
        {user && (
          <div className="mt-4">
            <form onSubmit={handleAddComment}>
              <input
                className="w-full p-2 rounded bg-gray-700 text-white mb-2"
                placeholder="Добавьте комментарий"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              />
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Отправить
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default DesignDetail;
