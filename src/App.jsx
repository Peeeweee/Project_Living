import { useState, useEffect } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ImpactSection from './components/ImpactSection'
import ActivitiesSection from './components/ActivitiesSection'
import Gallery from './components/Gallery'
import ExportButton from './components/ExportButton'
import AddEventButton from './components/AddEventButton'
import AddEventModal from './components/AddEventModal'
import Footer from './components/Footer'

function App() {
  // Initialize from LocalStorage or empty array
  const [activities, setActivities] = useState(() => {
    const saved = localStorage.getItem('living_with_me_portfolio');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.length > 0) {
          // SELF-HEALING: Clear expired blobs and inject local folder paths for known activities
          return parsed.map((activity, actIdx) => {
            return {
              ...activity,
              photos: activity.photos.map((photo, i) => {
                let currentSrc = photo.src?.startsWith('blob:') ? "" : photo.src;
                
                // If the link is empty or broken, auto-link to our new local folders for the first two activities
                if (!currentSrc || currentSrc.trim() === '') {
                  if (actIdx === 0) {
                    currentSrc = `/uploads/activities/1_Hug_Tree/${i + 1}.jpg`;
                  } else if (actIdx === 1) {
                    currentSrc = `/uploads/activities/2_Orphanage/${i + 1}.JPG`;
                  }
                }
                return { ...photo, src: currentSrc };
              }),
              certificate: {
                ...activity.certificate,
                image: activity.certificate?.image?.startsWith('blob:') 
                  ? "" 
                  : (actIdx === 1 && (!activity.certificate?.image || activity.certificate.image === '') 
                      ? '/uploads/activities/2_Certificate/1.jpg' 
                      : activity.certificate?.image)
              }
            };
          });
        }
      } catch (err) {
        console.error("Archive corruption detected, resetting storage.");
        localStorage.removeItem('living_with_me_portfolio');
      }
    }
    
    // Default high-fidelity documentary project
    return [
      {
        id: 'hug-a-tree',
        number: '01',
        title: 'Hug a Tree',
        date: '2026-03-15',
        location: 'Campus Sanctuary',
        organization: 'Green Earth Student Wing',
        description: 'A meditation on our connection to the living pillars of our campus. This activity focuses on the quiet power of ancient trees and their role in our psychological well-being.',
        photos: [
          { src: '/uploads/activities/1_Hug_Tree/1.jpg', caption: 'Connecting with the ancient banyan', position: 'center top', zoom: 'wide' },
          { src: '/uploads/activities/1_Hug_Tree/2.jpg', caption: 'Documenting the tree canopy', position: 'center top', zoom: 'zoom' },
          { src: '/uploads/activities/1_Hug_Tree/3.jpg', caption: 'Texture of endurance', position: 'center top', zoom: 'zoom' }
        ],
        certificate: { org: 'ESW', date: '2026-03-15', image: '' },
        reflection: 'The texture of the bark against my palms was a reminder of the slow, enduring pulse of nature.',
        hoursOfService: 2,
        volunteersEngaged: 15,
        livesTouched: 50
      },
      {
        id: 'orphanage-service',
        number: '02',
        title: 'Orphanage Community Service',
        date: '2026-04-02',
        location: 'Hope Springs Home',
        organization: 'Social Service Committee',
        description: 'Bringing the environmental message to the next generation. We spent a day teaching the importance of local gardening and sustainability through play.',
        photos: [
          { src: '/uploads/activities/2_Orphanage/1.JPG', caption: 'Sustainable gardening workshop', position: 'center top', zoom: 'wide' },
          { src: '/uploads/activities/2_Orphanage/2.JPG', caption: 'Engaging with the community', position: 'center top', zoom: 'zoom' },
          { src: '/uploads/activities/2_Orphanage/3.JPG', caption: 'Green lessons for the youth', position: 'center top', zoom: 'zoom' }
        ],
        certificate: { org: 'Hope Springs', date: '2026-04-02', image: '/uploads/activities/2_Certificate/1.jpg' },
        reflection: 'Teaching kids how to plant their first seed showed me that environmentalism is as much about people as it is about plants.',
        hoursOfService: 6,
        volunteersEngaged: 8,
        livesTouched: 120
      },
      {
        id: 'coastal-restoration',
        number: '03',
        title: 'Coastal Ecosystem Restoration',
        date: '2026-04-10',
        location: 'Azure Ridge Coast',
        organization: 'Ocean Guardians',
        description: 'A physically demanding day dedicated to removing non-biodegradable waste from the fragile coastal hatcheries.',
        photos: [
          { src: '/uploads/activities/3.jpg', caption: 'The restoration line in action', position: 'center top', zoom: 'wide' },
          { src: '', caption: '', position: 'center center', zoom: 'zoom' },
          { src: '', caption: '', position: 'center center', zoom: 'zoom' }
        ],
        certificate: { org: 'Coastal Commission', date: '2026-04-10', image: '' },
        reflection: 'The sheer volume of waste we removed was sobering, but the sight of a clean shoreline was worth every second.',
        hoursOfService: 8,
        volunteersEngaged: 25,
        livesTouched: 300
      }
    ];
  });

  const [editMode, setEditMode] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingActivity, setEditingActivity] = useState(null);

  // Persistence Hook
  useEffect(() => {
    localStorage.setItem('living_with_me_portfolio', JSON.stringify(activities));
  }, [activities]);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const handleSaveActivity = (activityData) => {
    if (editingActivity) {
      // Update existing
      setActivities(prev => prev.map(a => a.id === activityData.id ? activityData : a));
    } else {
      // Add new
      const nextNum = (activities.length + 1).toString().padStart(2, '0');
      
      const processedPhotos = activityData.photos.map((p, i) => ({
        src: p.src || `https://picsum.photos/seed/activity-${nextNum}-${i}/800/600`,
        caption: p.caption || `Documentation Point ${i + 1}`
      }));

      const newActivity = {
        ...activityData,
        id: crypto.randomUUID(),
        number: nextNum,
        photos: processedPhotos,
      };
      setActivities([...activities, newActivity]);
    }
    setEditingActivity(null);
  };

  const handleEditRequest = (activity) => {
    setEditingActivity(activity);
    setModalOpen(true);
  };

  const handleDeleteActivity = (id) => {
    setActivities(prev => prev.filter(a => a.id !== id).map((a, i) => ({
      ...a,
      number: (i + 1).toString().padStart(2, '0')
    })));
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(activities, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = 'living_with_me_archive.json';
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const importedData = JSON.parse(event.target.result);
        if (Array.isArray(importedData)) {
          // Re-sanitize any imported data to ensure local paths are active
          const sanitizedData = importedData.map((activity, actIdx) => {
            return {
              ...activity,
              photos: activity.photos.map((photo, i) => {
                let currentSrc = photo.src?.startsWith('blob:') ? "" : photo.src;
                if (!currentSrc || currentSrc.trim() === '') {
                  if (actIdx === 0) {
                    currentSrc = `/uploads/activities/1_Hug_Tree/${i + 1}.jpg`;
                  } else if (actIdx === 1) {
                    currentSrc = `/uploads/activities/2_Orphanage/${i + 1}.JPG`;
                  }
                }
                return { ...photo, src: currentSrc };
              }),
              certificate: {
                ...activity.certificate,
                image: activity.certificate?.image?.startsWith('blob:') 
                  ? "" 
                  : (actIdx === 1 && (!activity.certificate?.image || activity.certificate.image === '') 
                      ? '/uploads/activities/2_Certificate/1.jpg' 
                      : activity.certificate?.image)
              }
            };
          });
          setActivities(sanitizedData);
          alert('Archive Restored and Synced with Local Vault Successfully!');
        }
      } catch (err) {
        alert('Invalid Archive File');
      }
    };
    reader.readAsText(file);
  };

  const openAddModal = () => {
    setEditingActivity(null);
    setModalOpen(true);
  };

  return (
    <main className="bg-cream min-h-screen relative">
      {/* Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-[3px] bg-amber z-[100] origin-left"
        style={{ scaleX }}
      />
      
      <Navbar 
        editMode={editMode} 
        setEditMode={setEditMode} 
        onExport={handleExport}
        onImport={handleImport}
      />
      
      <div id="hero">
        <Hero />
      </div>
      
      <div id="impact">
        <ImpactSection activities={activities} />
      </div>
      
      <div id="activities">
        <ActivitiesSection 
          activities={activities} 
          setActivities={setActivities} 
          editMode={editMode}
          onEdit={handleEditRequest}
          onDelete={handleDeleteActivity}
        />
      </div>
      
      <div id="gallery">
        <Gallery activities={activities} />
      </div>
      
      <Footer />
      
      <ExportButton activities={activities} />

      {editMode && (
        <AddEventButton openModal={openAddModal} />
      )}

      <AddEventModal 
        open={modalOpen} 
        onClose={() => setModalOpen(false)} 
        onSave={handleSaveActivity} 
        initialData={editingActivity}
      />
    </main>
  )
}

export default App
