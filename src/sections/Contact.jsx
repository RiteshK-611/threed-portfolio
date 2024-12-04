"use client";

import emailjs from "@emailjs/browser";
import { useRef, useState } from "react";
import { motion } from "framer-motion";

import useAlert from "@/hooks/useAlert.js";
import Alert from "@/components/Alert.jsx";
import GlassContainer from "@/components/GlassContainer.jsx";

const Contact = () => {
  const formRef = useRef();

  const { alert, showAlert, hideAlert } = useAlert();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = ({ target: { name, value } }) => {
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .send(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          to_name: "Ritesh Kokam",
          from_email: form.email,
          to_email: "riteshkokam@gmail.com",
          message: form.message,
        },
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          setLoading(false);
          showAlert({
            show: true,
            text: "Thank you for your message ",
            type: "success",
          });

          setTimeout(() => {
            hideAlert(false);
            setForm({
              name: "",
              email: "",
              message: "",
            });
          }, [3000]);
        },
        (error) => {
          setLoading(false);
          console.error(error);

          showAlert({
            show: true,
            text: "I didn't receive your message ",
            type: "danger",
          });
        }
      );
  };

  return (
    <motion.section 
      className="c-space my-20 flex flex-col lg:flex-row items-center" 
      id="contact"
      initial={{ y: 100, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {alert.show && <Alert {...alert} />}

      <div className="relative min-h-screen flex items-center justify-center flex-col basis-1/2">
        {/* <img src="/assets/terminal.png" alt="terminal-bg" className="absolute inset-0 min-h-screen" /> */}

        <div className="contact-container">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="head-text">Let's talk</h3>
            <p className="text-lg text-white-600 mt-3">
              Whether you’re looking to build a new website, improve your existing
              platform, or bring a unique project to life, I’m here to help.
            </p>
          </motion.div>

          <motion.form
            ref={formRef}
            onSubmit={handleSubmit}
            className="mt-12 flex flex-col space-y-7"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <label className="space-y-3">
              <span className="field-label">Full Name</span>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="field-input"
                placeholder="ex., John Doe"
              />
            </label>

            <label className="space-y-3">
              <span className="field-label">Email address</span>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="field-input"
                placeholder="ex., johndoe@gmail.com"
              />
            </label>

            <label className="space-y-3">
              <span className="field-label">Your message</span>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={5}
                className="field-input"
                placeholder="Share your thoughts or inquiries..."
              />
            </label>

            <button className="field-btn" type="submit" disabled={loading}>
              {loading ? "Sending..." : "Send Message"}

              <img
                src="/assets/arrow-up.png"
                alt="arrow-up"
                className="field-btn_arrow"
              />
            </button>
          </motion.form>
        </div>
      </div>

      <div className="mt-20 md:mt-24 basis-1/2">
        <GlassContainer />
      </div>
    </motion.section>
  );
};

export default Contact;