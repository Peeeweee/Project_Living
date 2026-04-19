import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Camera, Upload, Trash2 } from 'lucide-react';

const PhotoUploadSlot = ({ id, photo, onPhotoChange, onCaptionChange, onPositionChange, onRemove }) => {
  const fileInputRef = useRef(null);
  const [isBroken, setIsBroken] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setIsProcessing(true);
      const reader = new FileReader();
      
      reader.onloadend = () => {
        // Create an image to compress it
        const img = new Image();
        img.src = reader.result;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 1200;
          const MAX_HEIGHT = 900;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          
          // Convert to compressed Base64
          const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7);
          
          setIsBroken(false);
          setIsProcessing(false);
          onPhotoChange(id, compressedBase64);
        };
      };
      
      reader.readAsDataURL(file);
    }
  };

  const v_positions = [
    { label: 'T', value: 'top', title: 'Focus Top' },
    { label: 'C', value: 'center', title: 'Focus Center' },
    { label: 'B', value: 'bottom', title: 'Focus Bottom' }
  ];

  const h_positions = [
    { label: 'L', value: 'left', title: 'Focus Left' },
    { label: 'C', value: 'center', title: 'Focus Center' },
    { label: 'R', value: 'right', title: 'Focus Right' }
  ];

  const currentPos = photo.position || 'center center';
  const [v_pos, h_pos] = currentPos.includes(' ') ? currentPos.split(' ') : ['center', 'center'];

  const handlePosUpdate = (newH, newV) => {
    onPositionChange(id, `${newH} ${newV}`);
  };

  return (
    <div className="flex flex-col gap-3 flex-1 min-w-[200px]">
      <div 
        className={`aspect-[4/3] border-2 border-dashed transition-all rounded-lg bg-white flex flex-col items-center justify-center overflow-hidden group relative ${
          isBroken ? 'border-red-400 bg-red-50/10' : 'border-muted/30 hover:border-amber'
        }`}
      >
        {isProcessing && (
          <div className="absolute inset-0 bg-charcoal/80 backdrop-blur-sm z-[30] flex flex-col items-center justify-center">
            <div className="w-8 h-8 border-2 border-amber border-t-transparent rounded-full animate-spin mb-2" />
            <span className="text-[10px] uppercase tracking-widest font-black text-amber">Processing</span>
          </div>
        )}

        {photo?.src ? (
          <>
            <img 
              src={photo.src} 
              alt="Preview" 
              className={`w-full h-full object-cover transition-all duration-500 ${isBroken ? 'opacity-20 blur-sm' : ''} ${photo.zoom === 'wide' ? 'scale-100' : 'scale-110'}`} 
              style={{ objectPosition: `${h_pos} ${v_pos}` }}
              onError={() => setIsBroken(true)}
              onLoad={() => setIsBroken(false)}
            />
            
            {/* Warning for Broken Local Blobs */}
            {isBroken && (
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center z-10">
                <p className="text-[9px] font-black text-red-500 uppercase tracking-tighter leading-tight mb-2">
                  Session Link Expired
                </p>
                <div className="flex gap-2">
                  <button type="button" onClick={() => fileInputRef.current?.click()} className="bg-red-500 text-white text-[9px] font-bold px-3 py-1 rounded-sm uppercase">Sync</button>
                  <button type="button" onClick={() => onRemove(id)} className="bg-charcoal text-white text-[9px] font-bold px-3 py-1 rounded-sm uppercase">Clear</button>
                </div>
              </div>
            )}

            {/* HIGH CONTRAST CONTROL OVERLAY */}
            <div className={`absolute inset-x-0 bottom-0 p-3 bg-charcoal/95 backdrop-blur-md flex flex-col gap-2 transition-transform border-t border-white/10 z-20 ${
              isBroken ? 'translate-y-0' : 'translate-y-full group-hover:translate-y-0'
            }`}>
              {/* Horizontal Controls */}
              <div className="flex justify-center gap-1.5 items-center">
                <span className="text-[8px] text-white/40 uppercase font-black mr-1">X-Axis</span>
                {h_positions.map((pos) => (
                  <button
                    key={pos.value}
                    type="button"
                    onClick={() => handlePosUpdate(pos.value, v_pos)}
                    className={`w-6 h-6 rounded-sm flex items-center justify-center text-[9px] font-black transition-all border ${
                      h_pos === pos.value 
                        ? 'bg-amber border-amber text-white shadow-lg' 
                        : 'bg-white/10 border-white/10 text-white/50 hover:text-white'
                    }`}
                  >
                    {pos.label}
                  </button>
                ))}
              </div>

              {/* Vertical Controls */}
              <div className="flex justify-center gap-1.5 items-center">
                <span className="text-[8px] text-white/40 uppercase font-black mr-1">Y-Axis</span>
                {v_positions.map((pos) => (
                  <button
                    key={pos.value}
                    type="button"
                    onClick={() => handlePosUpdate(h_pos, pos.value)}
                    className={`w-6 h-6 rounded-sm flex items-center justify-center text-[9px] font-black transition-all border ${
                      v_pos === pos.value 
                        ? 'bg-amber border-amber text-white shadow-lg' 
                        : 'bg-white/10 border-white/10 text-white/50 hover:text-white'
                    }`}
                  >
                    {pos.label}
                  </button>
                ))}
              </div>

              {/* Utility Row */}
              <div className="flex justify-between items-center mt-1 pt-2 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => onPositionChange(id, currentPos, photo.zoom === 'wide' ? 'zoom' : 'wide')}
                  className={`text-[8px] px-2 py-0.5 rounded-sm font-black uppercase transition-all ${
                    photo.zoom === 'wide' ? 'bg-amber text-white' : 'bg-white/10 text-white/60'
                  }`}
                >
                  {photo.zoom === 'wide' ? 'Narrow Fit' : 'Wide Fit'}
                </button>
                <div className="flex gap-1.5">
                  <button type="button" onClick={() => fileInputRef.current?.click()} className="w-5 h-5 rounded-sm bg-white/10 text-white hover:text-amber transition-colors flex items-center justify-center">
                    <Upload size={10} />
                  </button>
                  <button type="button" onClick={() => onRemove(id)} className="w-5 h-5 rounded-sm bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white transition-colors flex items-center justify-center">
                    <Trash2 size={10} />
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="w-full h-full flex flex-col items-center justify-center cursor-pointer group"
          >
            <Camera className="text-muted/40 group-hover:text-amber group-hover:scale-110 transition-all mb-2" size={32} />
            <span className="text-[10px] uppercase tracking-[1px] font-black text-muted/50 group-hover:text-amber">Media Slot</span>
          </div>
        )}
        <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
      </div>
      <input 
        type="text" 
        placeholder="Photo Caption" 
        className="text-[10px] font-sans border-b border-muted/10 py-1 outline-none focus:border-amber transition-colors italic text-charcoal/60"
        value={photo?.caption || ""}
        onChange={(e) => onCaptionChange(id, e.target.value)}
      />
    </div>
  );
};

const AddEventModal = ({ open, onClose, onSave, initialData }) => {
  const initialFormState = {
    title: '',
    date: '',
    location: '',
    organization: '',
    description: '',
    photos: [
      { src: '', caption: '', position: 'center' },
      { src: '', caption: '', position: 'center' },
      { src: '', caption: '', position: 'center' }
    ],
    certificateOrg: '',
    certificateDate: '',
    certificateImage: '',
    reflection: '',
    hoursOfService: 0,
    volunteersEngaged: 0,
    livesTouched: 0
  };

  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        date: initialData.date || "",
        location: initialData.location || "",
        organization: initialData.organization || "",
        description: initialData.description || "",
        photos: initialData.photos?.map(p => ({
          src: p.src || "",
          caption: p.caption || "",
          position: p.position || "center center",
          zoom: p.zoom || "zoom"
        })) || [{ src: "", caption: "", position: "center center", zoom: "zoom" }, { src: "", caption: "", position: "center center", zoom: "zoom" }, { src: "", caption: "", position: "center center", zoom: "zoom" }],
        certificateOrg: initialData.certificate?.org || "",
        certificateDate: initialData.certificate?.date || "",
        certificateImage: initialData.certificate?.image || "",
        reflection: initialData.reflection || "",
        hoursOfService: initialData.hoursOfService || 0,
        volunteersEngaged: initialData.volunteersEngaged || 0,
        livesTouched: initialData.livesTouched || 0
      });
    } else {
      setFormData(initialFormState);
    }
  }, [initialData, open]);

  const handlePhotoChange = (index, src) => {
    const newPhotos = [...formData.photos];
    newPhotos[index] = { ...newPhotos[index], src };
    setFormData({ ...formData, photos: newPhotos });
  };

  const handleCaptionChange = (index, caption) => {
    const newPhotos = [...formData.photos];
    newPhotos[index] = { ...newPhotos[index], caption };
    setFormData({ ...formData, photos: newPhotos });
  };

  const handlePositionChange = (index, position, zoom) => {
    const newPhotos = [...formData.photos];
    newPhotos[index] = { 
      ...newPhotos[index], 
      position: position || newPhotos[index].position,
      zoom: zoom || newPhotos[index].zoom
    };
    setFormData({ ...formData, photos: newPhotos });
  };

  const handleRemovePhoto = (index) => {
    const newPhotos = [...formData.photos];
    newPhotos[index] = { src: "", caption: "", position: "center" };
    setFormData({ ...formData, photos: newPhotos });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const activityData = {
      ...initialData,
      title: formData.title,
      date: formData.date,
      location: formData.location,
      organization: formData.organization,
      description: formData.description,
      photos: formData.photos,
      certificate: { 
        org: formData.certificateOrg, 
        date: formData.certificateDate,
        image: formData.certificateImage
      },
      reflection: formData.reflection,
      hoursOfService: Number(formData.hoursOfService),
      volunteersEngaged: Number(formData.volunteersEngaged),
      livesTouched: Number(formData.livesTouched)
    };

    onSave(activityData);
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-charcoal/80 backdrop-blur-sm"
            onClick={onClose}
          />
          
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 50 }}
            className="relative bg-white w-full max-w-[680px] max-h-[85vh] overflow-hidden flex flex-col shadow-2xl border-t-8 border-amber rounded-sm"
          >
            {/* Header */}
            <div className="flex justify-between items-center px-8 md:px-12 py-8 border-b border-muted/10 bg-white sticky top-0 z-10">
              <div className="relative inline-block">
                <h2 className="font-serif text-[28px] text-green-dark">
                  {initialData ? 'Edit Activity' : 'New Activity'}
                </h2>
                <div className="absolute -bottom-1 left-0 w-12 h-[2px] bg-amber" />
              </div>
              <button 
                onClick={onClose}
                className="text-muted hover:text-amber transition-colors p-2"
              >
                <X size={24} />
              </button>
            </div>

            {/* Scrollable Body */}
            <form onSubmit={handleSubmit} className="overflow-y-auto flex-1 p-8 md:p-12 space-y-12">
              
              {/* SECTION: Basic Info */}
              <div className="space-y-6">
                <h3 className="text-[11px] uppercase tracking-[4px] font-bold text-amber">Basic Info</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-muted/80">Activity Title *</label>
                    <input 
                      type="text" required placeholder="e.g. Forest Canopy Study"
                      className="w-full bg-transparent border-b border-muted/30 py-2 focus:border-amber outline-none transition-colors font-sans text-sm"
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-muted/80">Date *</label>
                    <input 
                      type="date" required
                      className="w-full bg-transparent border-b border-muted/30 py-2 focus:border-amber outline-none transition-colors font-sans text-sm"
                      value={formData.date}
                      onChange={(e) => setFormData({...formData, date: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-muted/80">Location</label>
                    <input 
                      type="text" placeholder="City, Country or Specific Bio-reserve"
                      className="w-full bg-transparent border-b border-muted/30 py-2 focus:border-amber outline-none transition-colors font-sans text-sm"
                      value={formData.location}
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-muted/80">Organization / Agency Name</label>
                    <input 
                      type="text" placeholder="e.g. WWF, Conservation Intl."
                      className="w-full bg-transparent border-b border-muted/30 py-2 focus:border-amber outline-none transition-colors font-sans text-sm"
                      value={formData.organization}
                      onChange={(e) => setFormData({...formData, organization: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              {/* SECTION: Description */}
              <div className="space-y-6">
                <h3 className="text-[11px] uppercase tracking-[4px] font-bold text-amber">Description</h3>
                <div className="space-y-2">
                  <textarea 
                    rows="4" required
                    placeholder="Describe what happened during this activity..."
                    className="w-full bg-cream/30 border border-muted/20 p-4 focus:border-amber outline-none transition-colors font-sans text-sm leading-relaxed"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                  />
                </div>
              </div>

              {/* SECTION: Impact Metrics */}
              <div className="space-y-6 pt-10 border-t-2 border-amber/10">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 bg-amber rounded-full" />
                  <h4 className="font-sans text-[11px] uppercase tracking-[4px] text-amber font-bold">Documentary Metrics</h4>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] uppercase tracking-[3px] text-charcoal/60 font-bold block ml-1">Hours of Service</label>
                    <input
                      type="number"
                      required
                      min="0"
                      placeholder="0"
                      value={formData.hoursOfService}
                      onChange={(e) => setFormData({ ...formData, hoursOfService: Number(e.target.value) || 0 })}
                      className="w-full bg-cream border-2 border-amber/10 p-5 font-serif text-2xl text-green-dark focus:border-amber focus:ring-0 outline-none transition-all rounded-lg shadow-inner"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] uppercase tracking-[3px] text-charcoal/60 font-bold block ml-1">Volunteers Engaged</label>
                    <input
                      type="number"
                      required
                      min="0"
                      placeholder="0"
                      value={formData.volunteersEngaged}
                      onChange={(e) => setFormData({ ...formData, volunteersEngaged: Number(e.target.value) || 0 })}
                      className="w-full bg-cream border-2 border-amber/10 p-5 font-serif text-2xl text-green-dark focus:border-amber focus:ring-0 outline-none transition-all rounded-lg shadow-inner"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] uppercase tracking-[3px] text-charcoal/60 font-bold block ml-1">Lives Touched</label>
                    <input
                      type="number"
                      required
                      min="0"
                      placeholder="0"
                      value={formData.livesTouched}
                      onChange={(e) => setFormData({ ...formData, livesTouched: Number(e.target.value) || 0 })}
                      className="w-full bg-cream border-2 border-amber/10 p-5 font-serif text-2xl text-green-dark focus:border-amber focus:ring-0 outline-none transition-all rounded-lg shadow-inner"
                    />
                  </div>
                </div>
                <p className="text-[9px] text-muted italic opacity-60">Values entered above will automatically aggregate in the global impact metrics report.</p>
              </div>

              {/* SECTION: Photos */}
              <div className="space-y-6">
                <h3 className="text-[11px] uppercase tracking-[4px] font-bold text-amber">Photos (3 slots)</h3>
                <div className="flex flex-col md:flex-row gap-6">
                  {formData.photos.map((photo, i) => (
                    <PhotoUploadSlot 
                      key={i} id={i} photo={photo}
                      onPhotoChange={handlePhotoChange}
                      onCaptionChange={handleCaptionChange}
                      onPositionChange={handlePositionChange}
                      onRemove={handleRemovePhoto}
                    />
                  ))}
                </div>
              </div>

              {/* SECTION: Certificate */}
              <div className="space-y-6">
                <h3 className="text-[11px] uppercase tracking-[4px] font-bold text-amber">Certificate & Validation</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-muted/80">Issuing Organization</label>
                      <input 
                        type="text" placeholder="Organization name on certificate"
                        className="w-full bg-transparent border-b border-muted/30 py-2 focus:border-amber outline-none transition-colors font-sans text-sm"
                        value={formData.certificateOrg}
                        onChange={(e) => setFormData({...formData, certificateOrg: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-muted/80">Certificate Date</label>
                      <input 
                        type="date"
                        className="w-full bg-transparent border-b border-muted/30 py-2 focus:border-amber outline-none transition-colors font-sans text-sm"
                        value={formData.certificateDate}
                        onChange={(e) => setFormData({...formData, certificateDate: e.target.value})}
                      />
                    </div>
                  </div>
                  
                  <div className="w-full">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-muted/80 block mb-3">Certificate Media</label>
                    <PhotoUploadSlot 
                      id="certificate" 
                      photo={{ src: formData.certificateImage, position: 'center center' }}
                      onPhotoChange={(_, src) => setFormData({...formData, certificateImage: src})}
                      onRemove={() => setFormData({...formData, certificateImage: ''})}
                      onPositionChange={() => {}} // Not needed for cert usually
                    />
                  </div>
                </div>
              </div>

              {/* SECTION: Reflection */}
              <div className="space-y-6">
                <h3 className="text-[11px] uppercase tracking-[4px] font-bold text-amber">Personal Reflection</h3>
                <div className="space-y-2">
                  <textarea 
                    rows="3" required
                    placeholder="What did you learn or feel during this activity?"
                    className="w-full bg-amber/5 border border-amber/10 p-4 italic focus:border-amber outline-none transition-colors font-serif text-base leading-relaxed"
                    value={formData.reflection}
                    onChange={(e) => setFormData({...formData, reflection: e.target.value})}
                  />
                </div>
              </div>
            </form>

            {/* Footer */}
            <div className="flex justify-end gap-6 items-center px-8 md:px-12 py-8 bg-cream/20 border-t border-muted/10">
              <button 
                type="button" 
                onClick={onClose}
                className="text-[11px] uppercase tracking-widest font-bold text-charcoal/60 hover:text-charcoal transition-colors border-2 border-charcoal/10 px-6 py-3 rounded-sm"
              >
                Cancel
              </button>
              <button 
                onClick={handleSubmit}
                className="bg-green-dark text-cream px-10 py-3 rounded-sm font-sans font-bold uppercase tracking-widest text-xs hover:bg-amber transition-shadow shadow-lg hover:shadow-amber/20"
              >
                {initialData ? 'Save Changes' : 'Add to Portfolio'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AddEventModal;
