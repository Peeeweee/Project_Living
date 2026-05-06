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
  // Default high-fidelity documentary project (Source of Truth for Defaults)
  const defaultActivities = [
    {
      id: 'hug-a-tree',
      type: 'activity',
      number: '01',
      title: 'Hug a Tree',
      date: '2026-03-20',
      location: 'Davao City',
      organization: 'University of Southeastern Philippines',
      description: 'The tree I chose to observe stands tall within our school campus, its massive trunk gnarled and textured with deep ridges of bark that speak to years of quiet growth. Up close, the bark felt rough and layered, almost like cracked earth, with patches of moss and lichen clinging to its surface — signs of a thriving microhabitat on its own skin. The tree\'s branches fork dramatically near the top, spreading outward in thick, heavy limbs that cast generous shade over the surrounding concrete. Despite being rooted in an urban environment, the tree seemed to breathe life into the space around it — small plants and ground cover grew at its base, and the canopy above filtered the harsh midday sunlight into something gentler and cooler.\n\nWrapping my arms around the trunk and looking up at its branches, I felt something unexpectedly grounding — like I was briefly tethered to something much older and more patient than anything in my daily routine. It reminded me to slow down, even for just a few minutes, in the middle of everything busy. Trees are easy to overlook precisely because they are always there, but their role in our ecosystem is immense: they produce the oxygen we breathe, regulate temperature, prevent soil erosion, store carbon, and provide shelter for countless organisms. In a campus setting, a single tree like this one quietly improves air quality, reduces heat, and offers a space of calm amid the noise. This activity was a simple but meaningful reminder that caring for the environment starts with something as small as noticing — and appreciating — what is already around us.',
      photos: [
        { src: '/uploads/activities/1_Hug_Tree/1.jpg', caption: 'My First Time Hugging a Tree', position: 'left top', zoom: 'zoom' },
        { src: '/uploads/activities/1_Hug_Tree/2.jpg', caption: 'The Sense of Relief feeling the oldest tree in the Campus', position: 'center top', zoom: 'zoom' },
        { src: '/uploads/activities/1_Hug_Tree/3.jpg', caption: 'Oldest Tree in the Campus', position: 'left top', zoom: 'zoom' }
      ],
      certificate: { org: '', date: '', image: '' },
      reflection: '"Slow down, Relax, Even for just a few minutes, in the middle of everything Busy"',
      hoursOfService: 1,
      volunteersEngaged: 2,
      livesTouched: 5
    },
    {
      id: 'orphanage-service',
      type: 'activity',
      number: '02',
      title: 'An Orphanage Community Service',
      date: '2026-04-17',
      location: 'Tugbok, Davao City, Davao del Sur',
      organization: 'Tugbok, Davao City, Davao del Sur',
      description: 'The Field of Dreams Children\'s Charity Foundation sits quietly in Purok 1, Biao Guianga, Tugbok District — a place that, from the outside, looks simple, but the moment you step inside, you realize it holds something much bigger than its walls. On April 17, 2026, a combined team of CAS and CIC students spent the morning with the children there, and what was supposed to be just a community service activity turned into one of those experiences that stays with you longer than you expect.\n\nWe arrived at 8:00 AM and were welcomed by Mr. Jonathan Cabaljog, the Center Head, and Mr. Leonard Culanag Jr. The children were already gathered, and just seeing their energy that early in the morning set the tone for everything that followed. As one of the event heads representing CIC, I worked alongside CAS students to coordinate the flow of the program — from the opening remarks all the way to the parlor games and snack distribution. What made this collaboration feel special was seeing two colleges with different backgrounds come together for the same purpose. Ms. Rolyn Ann Floresta Bendanillo led an environmental talk that connected well with the kids, reminding them that even small habits like proper waste disposal and caring for plants are acts of love for the world they live in. The B-Relay game and the B-Wish Tree activity brought out a lot of laughter, which honestly made the whole morning feel lighter and more meaningful.',
      photos: [
        { src: '/uploads/activities/2_Orphanage/1.JPG', caption: 'Field of Dreams with the Orphanage Kids', position: 'center center', zoom: 'zoom' },
        { src: '/uploads/activities/2_Orphanage/2.JPG', caption: 'CIC Students at FOD', position: 'center center', zoom: 'zoom' },
        { src: '/uploads/activities/2_Orphanage/3.JPG', caption: 'CIC x CAS Students at FOD', position: 'center center', zoom: 'zoom' }
      ],
      certificate: { 
        org: 'Field of Dreams Children’s Charity Foundation Inc.', 
        date: '2026-04-17', 
        image: '/uploads/activities/2_Certificate/1.jpg' 
      },
      reflection: '"Protecting the environment and caring for people are not two separate things. They are part of the same responsibility."',
      hoursOfService: 5,
      volunteersEngaged: 15,
      livesTouched: 21
    },
    {
      id: 'community-tree-planting',
      type: 'activity',
      number: '03',
      title: 'Community Tree Planting',
      date: '2026-05-02',
      location: 'Coastal Road, Davao City, Davao Del Sur',
      organization: 'USeP',
      description: 'On May 1, 2026, we spent our time from 11 am to 2 pm doing a coastal cleanup and planting mangroves. As students from USeP, we joined this activity as volunteers because we want to help restore the aquatic ecosystems in our local area. Even though it was the middle of the day and very hot, it felt good to take action for the environment. Picking up trash and planting those trees showed me how much work it takes to protect nature. We hope that these mangroves will grow and provide a better home for marine life in the future. It was a great experience to work together with my classmates for a cause that actually matters for our community. Growing up near these waters makes you realize that we need to be the ones looking after them. Taking part in this restoration drive was a small step, but it felt like we were doing something real to help our environment heal.',
      photos: [
        { src: '/uploads/activities/3_Tree_Planting/1.jpg', caption: 'Tree Planting Activity', position: 'center center', zoom: 'zoom' },
        { src: '/uploads/activities/3_Tree_Planting/2.JPG', caption: 'Tree Planting Activity', position: 'center center', zoom: 'zoom' },
        { src: '/uploads/activities/3_Tree_Planting/3.jpg', caption: 'Tree Planting Activity', position: 'center center', zoom: 'zoom' }
      ],
      certificate: { org: '', date: '', image: '' },
      reflection: '',
      hoursOfService: 3,
      volunteersEngaged: 15,
      livesTouched: 100
    },
    {
      id: 'slogan-mining',
      type: 'slogan',
      number: '04',
      title: 'Settle for Old Not Gold',
      date: '2026-05-06',
      location: 'Mindanao, Philippines',
      organization: 'By: Kent Paulo Delgado',
      description: 'The slogan "Settle for Old, Not Gold" is a call to choose what already exists over what mining promises to bring. Literally, it tells communities to hold on to what is old: the clean rivers, the forests, the land that has sustained generations of families long before any mining company arrived. "Gold" here refers not just to the mineral being extracted but to the economic pitch that comes with it — the promise of jobs, infrastructure, and development. The slogan pushes back against that pitch by saying that what we already have is worth more than what we are being offered. Clean water, fertile soil, and intact ecosystems are not things that can be replaced once they are gone, and no check from a mining company can bring them back.\n\nOn a deeper level, the slogan is about cultural and generational identity. "Old" does not mean outdated or primitive. It means rooted, proven, and alive. For many communities in Mindanao, rivers and mountains are not just natural resources — they are part of indigenous traditions, spiritual practices, and ways of life that have existed for centuries. When mining operations tear into those landscapes, they do not only destroy the environment. They erase history and cut off future generations from the world their ancestors knew. "Settle for Old, Not Gold" is a quiet act of defiance against the idea that progress always means extraction. It reframes "settling" not as giving up, but as choosing wisely — because choosing clean rivers over short-term profit is not a compromise. It is the smarter and braver decision.\n\nI chose mining because its effects are real and close to home. Davao and the wider Mindanao region sit on some of the richest mineral deposits in the country, which makes them constant targets for large-scale and small-scale mining alike. Communities near active mining areas have reported murky rivers, dying fish populations, and land that no longer supports farming the way it used to. Indigenous groups, in particular, have been fighting for years to protect their ancestral domains from operations that treat their land as a resource to be used up and moved on from. This slogan is my small way of joining that conversation. It is short enough to fit on a poster or a phone screen, but the idea behind it is serious: what we already have is irreplaceable, and we should stop being convinced otherwise.',
      photos: [
        { src: '/uploads/activities/4_Slogan/Slogan.png', caption: 'Settle for Old Not Gold - Mining Pollution', position: 'center center', zoom: 'zoom' }
      ],
      certificate: { org: '', date: '', image: '' },
      reflection: 'Settle for Old Not Gold',
      hoursOfService: 0,
      volunteersEngaged: 0,
      livesTouched: 0
    }
  ];

  // Initialize from LocalStorage or empty array
  const [activities, setActivities] = useState(() => {
    const saved = localStorage.getItem('living_with_me_portfolio');
    if (saved) {
      try {
        let parsed = JSON.parse(saved);
        
        // DE-DUPLICATION LOGIC (Cleans up corrupted local storage)
        const uniqueIds = new Set();
        parsed = parsed.filter(activity => {
          if (uniqueIds.has(activity.id)) return false;
          uniqueIds.add(activity.id);
          return true;
        });
        
        // AUTO-SYNC: Ensure Chapter 04 is present if we are on the latest archive version
        if (parsed.length < 4) {
          const existingIds = new Set(parsed.map(a => a.id));
          const missingDefaults = defaultActivities.filter(def => !existingIds.has(def.id));
          if (missingDefaults.length > 0) {
            parsed = [...parsed, ...missingDefaults].sort((a, b) => parseInt(a.number) - parseInt(b.number));
          }
        }

        if (parsed && parsed.length > 0) {
          return parsed.map((activity, actIdx) => {
            return {
              ...activity,
              photos: activity.photos.map((photo, i) => {
                let currentSrc = photo.src?.startsWith('blob:') ? "" : photo.src;
                
                // Auto-link local folders for first two activities
                if (!currentSrc || currentSrc.trim() === '') {
                  if (activity.id === 'hug-a-tree') {
                    currentSrc = `/uploads/activities/1_Hug_Tree/${i + 1}.jpg`;
                  } else if (activity.id === 'orphanage-service') {
                    currentSrc = `/uploads/activities/2_Orphanage/${i + 1}.JPG`;
                  }
                }
                return { ...photo, src: currentSrc };
              }),
              certificate: {
                ...activity.certificate,
                image: activity.certificate?.image?.startsWith('blob:') 
                  ? "" 
                  : (activity.id === 'orphanage-service' && (!activity.certificate?.image || activity.certificate.image === '') 
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
    
    return defaultActivities;
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
                  if (activity.id === 'hug-a-tree') {
                    currentSrc = `/uploads/activities/1_Hug_Tree/${i + 1}.jpg`;
                  } else if (activity.id === 'orphanage-service') {
                    currentSrc = `/uploads/activities/2_Orphanage/${i + 1}.JPG`;
                  }
                }
                return { ...photo, src: currentSrc };
              }),
              certificate: {
                ...activity.certificate,
                image: activity.certificate?.image?.startsWith('blob:') 
                  ? "" 
                  : (activity.id === 'orphanage-service' && (!activity.certificate?.image || activity.certificate.image === '') 
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
