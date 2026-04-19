import ActivityChapter from './ActivityChapter';
import ActivityDetail from './ActivityDetail';
import { motion } from 'framer-motion';

const ActivitiesSection = ({ activities, setActivities, editMode, onEdit, onDelete }) => {
  return (
    <section id="activities">
      {activities.map((activity) => (
        <motion.div 
          key={activity.id}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8 }}
        >
          <ActivityChapter 
            number={activity.number} 
            title={activity.title} 
            image={activity.photos[0].src} 
            position={activity.photos[0].position}
            zoom={activity.photos[0].zoom}
          />
          <ActivityDetail 
            activity={activity} 
            editMode={editMode}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </motion.div>
      ))}
    </section>
  );
};

export default ActivitiesSection;
